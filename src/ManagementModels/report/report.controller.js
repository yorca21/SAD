const { getDebtorsByCriteria } = require('./report.queries');
const { generatePDF } = require('./report.utils');

const generateDebtorReport = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    // Obtener los deudores según los filtros proporcionados
    const debtors = await getDebtorsByCriteria({ status, startDate, endDate });

    if (!debtors.length) {
      return res.status(404).json({ success: false, message: 'No se encontraron deudores' });
    }

    // Generar el PDF con los datos obtenidos
    const pdfBuffer = await generatePDF(debtors, 'Reporte de Deudores');

    // Configurar la respuesta para descargar el PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte_deudores.pdf"');

    // Enviar el buffer del PDF como respuesta
    return res.send(pdfBuffer);
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    return res.status(500).json({ success: false, message: 'Error al generar el reporte.' });
  }
};

module.exports = { generateDebtorReport };
