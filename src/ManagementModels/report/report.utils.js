const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = (data, title) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30 });
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    const encabezado = path.join(__dirname, '../../assets/logo2.png');
    doc.image(encabezado, 0, 0, { width: doc.page.width, height: 100 });

    doc.moveDown(6);
    doc.fontSize(18).text(title, { align: 'center', underline: true });
    doc.moveDown(2);

    const columnWidths = [150, 100, 80, 100, 120];
    const headers = ['Nombre', 'CI', 'Estado', 'Unidad', 'Total Deuda'];

    doc.fontSize(12);
    let currentY = doc.y;
    headers.forEach((header, index) => {
      const xPos = 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      doc.text(header, xPos, currentY, { width: columnWidths[index], continued: false });
    });

    currentY += 15;
    doc.lineWidth(0.5).moveTo(30, currentY).lineTo(30 + columnWidths.reduce((a, b) => a + b, 0), currentY).stroke();
    currentY += 10;

    data.forEach(debtor => {
      const totalDebt = Array.isArray(debtor.debts)
        ? debtor.debts.reduce((sum, debt) => sum + (typeof debt.amount === 'number' ? debt.amount : 0), 0)
        : 0;

      const totalDebtFormatted = !isNaN(totalDebt) ? totalDebt.toFixed(2) : '0.00';

      const units = Array.isArray(debtor.debts)
        ? debtor.debts
            .filter(debt => debt && debt.unit)
            .map(debt => debt.unit)
            .join(', ') || 'N/A'
        : 'N/A';

      console.log('Debtor:', debtor.name);
      console.log('Units:', units);

      const rowData = [
        debtor.name || 'N/A',
        debtor.ci?.toString() || 'N/A',
        debtor.status || 'N/A',
        units || 'N/A',
        `$${totalDebtFormatted}`,
      ];

      rowData.forEach((data, index) => {
        const xPos = 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
        const cellWidth = columnWidths[index];
        const truncatedData = data.length > 20 ? data.substring(0, 17) + '...' : data;
        doc.text(truncatedData, xPos, currentY, { width: cellWidth, continued: false });
      });

      currentY += 15;
      doc.lineWidth(0.5).moveTo(30, currentY).lineTo(30 + columnWidths.reduce((a, b) => a + b, 0), currentY).stroke();
      currentY += 10;
    });

    doc.end();
  });
};

module.exports = { generatePDF };
