const { generatePaymentReceipt } = require('./proofofPayment');
const Debtor = require('../newdebt/Register');

const generateReceipt = async (req, res) => {
  const { debtorId } = req.params;
  const { debts } = req.body;

  try {
    const debtor = await Debtor.findById(debtorId)
      .populate({
        path: 'debts',
        populate: {
          path: 'unit',
          select: 'name', // Solo traer el nombre
        },
      });

    if (!debtor) return res.status(404).json({ msg: 'Deudor no encontrado' });

    const paidDebts = debtor.debts.filter(d => debts.includes(String(d._id)));

    const pdfBuffer = await generatePaymentReceipt(debtor, paidDebts);

    // ✅ Enviamos el PDF al frontend para previsualización (no se guarda, no se descarga)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=boleta_pago.pdf',
      'Content-Length': pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al generar el PDF' });
  }
};

// Genera automáticamente el comprobante si corresponde (también con Buffer)
const generateVoucherIfNeeded = async (debtorId, triggerType, debtsToHide = []) => {
  const debtor = await Debtor.findById(debtorId)
    .populate({
      path: 'debts',
      populate: {
        path: 'unit',
        select: 'name',
      },
    });

  if (!debtor) throw new Error('Deudor no encontrado');

  // Comprobante automático al inactivar deudor
  if (triggerType === 'deudor' && debtor.status === 'inactive') {
    const pdfBuffer = await generatePaymentReceipt(debtor, debtor.debts);
    return pdfBuffer;
  }

  // Comprobante automático cuando una o más deudas se ocultan
  if (triggerType === 'deuda' && debtsToHide.length > 0) {
    // Seleccionamos solo las deudas ocultadas
    const paidDebts = debtor.debts.filter(debt => debtsToHide.includes(String(debt._id)));

    if (paidDebts.length === 0) 
      return null; // Si no hay deudas ocultas, no generamos comprobante

    const pdfBuffer = await generatePaymentReceipt(debtor, paidDebts);
    return pdfBuffer;
  }

  return null; // No se genera comprobante si no se cumple la condición
};

module.exports = { 
  generateReceipt, 
  generateVoucherIfNeeded 
};
