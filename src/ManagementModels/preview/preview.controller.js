const PDFDocument = require('pdfkit');
const path = require('path');
const Debtor = require('../newdebt/Register');

const generateDebtorPDF = async (req, res) => {
    try {
        const { debtorId } = req.body;

        if (!debtorId) {
            return res.status(400).json({ error: "El ID del deudor es requerido." });
        }

        // Poblar deudas y sus unidades
        const debtor = await Debtor.findById(debtorId)
            .populate({
                path: 'debts',
                populate: {
                    path: 'unit', // Poblar la unidad dentro de cada deuda
                    select: 'name', // Solo extraer el campo `name`
                },
            });

        if (!debtor) {
            return res.status(404).json({ error: "Deudor no encontrado." });
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=deudor_${debtor.ci}.pdf`);

        doc.pipe(res);

        const logoPath = path.join(__dirname, '../../assets/logo2.png');
        try {
            doc.image(logoPath, 0, 0, { width: doc.page.width, height: 100 });
        } catch (error) {
            console.error("No se encontró el logo, generando sin él.");
        }

        doc.moveDown(6);
        doc.fontSize(20).text('Detalles del Deudor', { align: 'center' }).moveDown();
        doc.fontSize(14)
            .text(`Nombre: ${debtor.name}`)
            .text(`CI: ${debtor.ci}`)
            .text(`Estado: ${debtor.status === 'pending' ? 'Pendiente' : debtor.status === 'active' ? 'Activo' : 'Inactivo'}`)
            .text(`Fecha de Registro: ${new Date(debtor.createdAt).toLocaleDateString()}`)
            .moveDown();

        doc.fontSize(18).text('Deudas Asociadas', { align: 'center', underline: true }).moveDown();

        const startX = 50;
        let startY = doc.y;
        const columnWidth = [50, 80, 150, 150, 100]; // Columnas: N°, Fecha, Descripción, Unidad, Monto

        // Encabezados de la tabla
        doc.fontSize(12)
            .text('N°', startX, startY, { width: columnWidth[0], align: 'center' })
            .text('Fecha', startX + columnWidth[0], startY, { width: columnWidth[1], align: 'center' })
            .text('Descripción', startX + columnWidth[0] + columnWidth[1], startY, { width: columnWidth[2], align: 'left' })
            .text('Unidad', startX + columnWidth[0] + columnWidth[1] + columnWidth[2], startY, { width: columnWidth[3], align: 'left' })
            .text('Monto', startX + columnWidth[0] + columnWidth[1] + columnWidth[2] + columnWidth[3], startY, { width: columnWidth[4], align: 'center' });

        doc.moveTo(startX, startY + 15)
            .lineTo(startX + columnWidth.reduce((a, b) => a + b, 0), startY + 15)
            .stroke();
        startY += 25;

        if (debtor.debts && debtor.debts.length > 0) {
            debtor.debts.forEach((debt, index) => {
                doc.fontSize(12)
                    .text(`${index + 1}`, startX, startY, { width: columnWidth[0], align: 'center' })
                    .text(new Date(debt.recordDate).toLocaleDateString(), startX + columnWidth[0], startY, { width: columnWidth[1], align: 'center' })
                    .text(debt.description, startX + columnWidth[0] + columnWidth[1], startY, { width: columnWidth[2], align: 'left' })
                    .text(debt.unit?.name || 'Sin Unidad', startX + columnWidth[0] + columnWidth[1] + columnWidth[2], startY, { width: columnWidth[3], align: 'left' })
                    .text(debt.amount.toFixed(2), startX + columnWidth[0] + columnWidth[1] + columnWidth[2] + columnWidth[3], startY, { width: columnWidth[4], align: 'center' });

                startY += 20;

                if (startY > doc.page.height - 50) {
                    doc.addPage();
                    startY = 50;
                }
            });
        } else {
            doc.fontSize(14).text('No tiene deudas registradas.', startX, startY + 10, { align: 'center' });
        }

        doc.end();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF.' });
    }
};

module.exports = { generateDebtorPDF };
