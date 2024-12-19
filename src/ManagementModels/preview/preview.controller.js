const PDFDocument = require('pdfkit');
const path = require('path');
const Debtor = require('../newdebt/Register');

const generateDebtorPDF = async (req, res) => {
    try {
        const { debtorId } = req.body;
        // console.log('req body =>', debtorId);

        // Validación del ID de deudor
        if (!debtorId) {
            return res.status(400).json({ error: "El ID del deudor es requerido." });
        }

        // Obtener el deudor y las deudas asociadas
        const debtor = await Debtor.findById(debtorId).populate('debts');

        if (!debtor) {
            return res.status(404).json({ error: "Deudor no encontrado." });
        }

        // Crear el documento PDF
        const doc = new PDFDocument();

        // Configurar headers para transmitir el PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=deudor_${debtor.ci}.pdf`);

        // Enviar el PDF como flujo
        doc.pipe(res);

        // Agregar logo
        const logoPath = path.join(__dirname, '../../assets/logo2.png');
        try {
            doc.image(logoPath, 0, 0, { width: doc.page.width, height: 100 });
        } catch (error) {
            console.error("No se encontró el logo, generando sin él.");
        }

        doc.moveDown(6);

        // Título del documento
        doc.fontSize(20)
            .text('Detalles del Deudor', { align: 'center' })
            .moveDown();

        // Información del deudor
        doc.fontSize(14)
            .text(`Nombre: ${debtor.name}`)
            .text(`CI: ${debtor.ci}`)
            .text(`Estado: ${debtor.status}`)
            .moveDown();

        // Encabezados de la tabla de deudas
        doc.fontSize(18)
            .text('Deudas Asociadas', {  align: 'center', underline: true })
            .moveDown();

        const startX = 50;
        let startY = doc.y;
        const columnWidth = [80, 150, 200, 100]; // Ancho de las columnas: N° Deuda, Monto, Descripción, Fecha

        // Dibujar encabezados de la tabla
        doc.fontSize(12)
            .text('N° Deuda', startX, startY, { width: columnWidth[0], align: 'center' })
            .text('Fecha', startX +columnWidth[0], startY, { width: columnWidth[1], align: 'center' })
            .text('Descripción', startX + columnWidth[0] + columnWidth[1], startY, { width: columnWidth[2], align: 'left' })
            .text('Monto', startX + columnWidth[0] + columnWidth[1] + columnWidth[2], startY, { width: columnWidth[3], align: 'center' });
        
        //lineas separadoras 
        doc.moveTo(startX, startY + 15)
            .lineTo(startX + columnWidth.reduce((a, b) => a + b, 0), startY + 15)
            .stroke();
        startY += 25; // Espacio debajo de los encabezados

        // Agregar deudas a la tabla
        if (debtor.debts && debtor.debts.length > 0) {
            debtor.debts.forEach((debt, index) => {
                doc.fontSize(12)
                    .text(`${index + 1}`, startX, startY, { width: columnWidth[0], align: 'center' }) // Columna de número
                    .text(new Date(debt.recordDate).toLocaleDateString(), startX +  columnWidth[0], startY, { width: columnWidth[1], align: 'center' })
                    .text(debt.description, startX + columnWidth[0] + columnWidth[1], startY, { width: columnWidth[2], align: 'left' }) // Columna de descripción
                    .text(`${debt.amount.toFixed(2)}`, startX + columnWidth[0] + columnWidth[1] + columnWidth[2], startY, { width: columnWidth[3], align: 'center' });// Columna de monto;

                startY += 20; // Incrementar la posición Y para la siguiente fila
                
                if (startY > doc.page.height - 50) { // Verificar si queda espacio en la página
                    doc.addPage();
                    startY = 50; // Reiniciar posición Y en la nueva página
                }
            });
        } else {
            doc.fontSize(14).text('No tiene deudas registradas.', startX, startY + 10, { align: 'center' });
        }

        // Finalizar el documento
        doc.end();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF.' });
    }
};

module.exports = { generateDebtorPDF };
