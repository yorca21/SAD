const PDFDocument = require('pdfkit');
const path = require('path');

const generatePaymentReceipt = (debtor, debts) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.on('error', reject);
    const logoPath = path.join(__dirname, '../../assets/Logos.png');
    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // Encabezado con logo
    doc.image(logoPath, doc.page.margins.left, 10, {
      width: pageWidth,
      align: 'center',
    });

    doc.moveDown(8);

    doc
      .fontSize(22)
      .text('Comprobante de Pago', { align: 'center' })
      .moveDown();

    doc
      .fontSize(14)
      .text(`Nombre del Deudor: ${debtor.name}`)
      .text(`CI: ${debtor.ci}`)
      .text(`Fecha: ${new Date().toLocaleDateString()}`);

    doc
      .moveDown(0.5)
      .strokeColor('#aaa')
      .lineWidth(1)
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke()
      .moveDown();

    doc.fontSize(16).text('Deudas Canceladas:', { underline: true });
    doc.moveDown(0.5);

    // Columnas
    const startX = doc.page.margins.left;
    let y = doc.y;

    const colWidths = {
      number: 30,
      description: 200,
      unit: 100,
      date: 90,
      amount: 70,
    };

    // Encabezados
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('N°', startX, y, { width: colWidths.number });
    doc.text('Descripción', startX + colWidths.number, y, { width: colWidths.description });
    doc.text('Unidad', startX + colWidths.number + colWidths.description, y, { width: colWidths.unit });
    doc.text('Fecha', startX + colWidths.number + colWidths.description + colWidths.unit, y, { width: colWidths.date });
    doc.text('Monto', startX + colWidths.number + colWidths.description + colWidths.unit + colWidths.date, y, { width: colWidths.amount, align: 'right' });

    doc.moveDown(0.5);
    y = doc.y;

    doc.font('Helvetica');

    debts.forEach((debt, index) => {
      const description = `${debt.description}`;
      const unitName = debt.unit?.name || '-';
      const recordDate = new Date(debt.recordDate).toLocaleDateString();
      const amount = `Bs ${debt.amount.toFixed(2)}`;

      const lineHeight = 14;

      // Calcular altura máxima de la fila
      const descHeight = doc.heightOfString(description, { width: colWidths.description });
      const unitHeight = doc.heightOfString(unitName, { width: colWidths.unit });
      const rowHeight = Math.max(descHeight, unitHeight, lineHeight);

      const yBefore = doc.y;

      // Escribir cada celda alineada a la misma altura
      doc.text(index + 1, startX, yBefore, { width: colWidths.number });
      doc.text(description, startX + colWidths.number, yBefore, { width: colWidths.description });
      doc.text(unitName, startX + colWidths.number + colWidths.description, yBefore, { width: colWidths.unit });
      doc.text(recordDate, startX + colWidths.number + colWidths.description + colWidths.unit, yBefore, { width: colWidths.date });
      doc.text(amount, startX + colWidths.number + colWidths.description + colWidths.unit + colWidths.date, yBefore, { width: colWidths.amount, align: 'right' });

      doc.y = yBefore + rowHeight + 5; // pasar a la siguiente fila
    });

    const total = debts.reduce((acc, d) => acc + d.amount, 0);
    doc
      .moveDown()
      .fontSize(14)
      .text(`Total Pagado: Bs ${total.toFixed(2)}`, { align: 'right' });

    // Línea separadora
    doc
      .moveDown(1.5)
      .strokeColor('#aaa')
      .lineWidth(1)
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke()
      .moveDown(2);

    // Firmas
    const startY = doc.y;
    doc
      .fontSize(12)
      .text('_____________________________', 72, startY)
      .text('Oficina de Contabilidad', 72, startY + 15)
      .text('Nombre y Firma', 72, startY + 30);

    doc
      .text('_____________________________', 320, startY)
      .text('Oficina de Bienes', 320, startY + 15)
      .text('Nombre y Firma', 320, startY + 30);

    doc.end();
  });
};

module.exports = { generatePaymentReceipt };
