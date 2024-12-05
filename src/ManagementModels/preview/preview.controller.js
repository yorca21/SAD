const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateDebtorPDF = (req, res) => {
  const { namedebtor, CIdebtor, description, status } = req.body;

  // Crear un documento PDF
  const doc = new PDFDocument();

  // Ruta temporal para guardar el archivo
  const filePath = path.join(__dirname, '..', 'uploads', `deudor_${ci}.pdf`);

  // Escribir el PDF en un archivo temporal
  doc.pipe(fs.createWriteStream(filePath));

  // Agregar contenido
  const logoPath = path.join(__dirname, '..', 'assets', 'logo2.png');
  doc.image(logoPath, { fit: [100, 100], align: 'center' })
    .fontSize(20)
    .text('Detalles del Deudor', { align: 'center' })
    .moveDown();

  doc.fontSize(14)
    .text(`Nombre: ${namedebtor}`)
    .text(`CI: ${CIdebtor}`)
    .text(`Descripción: ${description}`)
    .text(`Estado: ${status}`)
    .moveDown();

  doc.end();

  // Enviar el archivo cuando se termine de generar
  doc.on('finish', () => {
    res.download(filePath, `Detalles_Deudor_${ci}.pdf`, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
      }
      fs.unlinkSync(filePath); // Eliminar archivo temporal
    });
  });
};

module.exports = { generateDebtorPDF };
