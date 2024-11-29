const PDFDocument = require('pdfkit');

const generatePDF = (data, title) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30 });
    const chunks = [];

    // Capturar datos del PDF en un buffer
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Título del reporte
    doc.fontSize(18).text(title, { align: 'center', underline: true });
    doc.moveDown(2);

    // Encabezados de la tabla
    doc.fontSize(12)
       .text('ID', { width: 100, continued: true })
       .text('Nombre', { width: 150, continued: true })
       .text('CI', { width: 100, continued: true })
       .text('Estado', { width: 80, continued: true })
       .text('Total Deuda', { width: 100 });

    doc.moveDown();

    // Datos de cada deudor
    data.forEach(debtor => {
      const totalDebt = debtor.debts ? debtor.debt.reduce((sum, debt) => sum + debt.amount, 0):0;

      doc.text(debtor._id.toString(), { width: 100, continued: true })
         .text(debtor.namedebtor, { width: 150, continued: true })
         .text(debtor.CIdebtor.toString(), { width: 100, continued: true })
         .text(debtor.status, { width: 80, continued: true })
         .text(`$${totalDebt.toFixed(2)}`, { width: 100 });

      doc.moveDown();
    });

    doc.end();
  });
};

module.exports = { generatePDF };
