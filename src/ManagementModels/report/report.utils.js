const PDFDocument = require('pdfkit');
const path = require('path');


const generatePDF = (data, title) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30 });
    const chunks = [];

    // Capturar datos del PDF en un buffer
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    const encabezado = path.join(__dirname, '../../assets/logo2.png');
    doc.image(encabezado,0,0, { width: doc.page.width, height: 100});

    doc.moveDown(6);
    // Título del reporte
    doc.fontSize(18).text(title, { align: 'center', underline: true });
    doc.moveDown(2);

    // Definir los anchos de las columnas
    const columnWidths = [200, 150, 100, 80, 100];  // Anchos de las columnas
    const headers = ['Nombre', 'CI', 'Estado', 'Total Deuda'];

    // Dibujar los encabezados de la tabla
    doc.fontSize(12);
    let currentY = doc.y;
    headers.forEach((header, index) => {
      const xPos = 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      doc.text(header, xPos, currentY, { width: columnWidths[index], continued: false });
    });

    // Mover a la siguiente línea después de los encabezados
    currentY += 15;

    // Dibujar la línea debajo de los encabezados
    doc.lineWidth(0.5).moveTo(30, currentY).lineTo(30 + columnWidths.reduce((a, b) => a + b, 0), currentY).stroke();
    currentY += 10; // Dejar un pequeño espacio después de la línea

    // Dibujar los datos de cada deudor
    data.forEach(debtor => {
      const totalDebt = Array.isArray(debtor.debts)
        ? debtor.debts.reduce((sum, debt) => sum + (typeof debt.amount === 'number' ? debt.amount : 0), 0)
        : 0;

      const totalDebtFormatted = !isNaN(totalDebt) ? totalDebt.toFixed(2) : '0.00';

      const rowData = [
        debtor.name || 'N/A',
        debtor.ci?.toString() || 'N/A',
        debtor.status || 'N/A',
        `$${totalDebtFormatted}`
      ];

      rowData.forEach((data, index) => {
        const xPos = 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
        doc.text(data, xPos, currentY, { width: columnWidths[index], continued: false });
      });

      // Dibujar la línea después de la fila de datos
      currentY += 15; // Aumentar la posición Y para la siguiente fila
      doc.lineWidth(0.5).moveTo(30, currentY).lineTo(30 + columnWidths.reduce((a, b) => a + b, 0), currentY).stroke();
      currentY += 10; // Dejar un pequeño espacio después de la línea
    });

    // Finalizar el documento
    doc.end();
  });
};

module.exports = { generatePDF };
