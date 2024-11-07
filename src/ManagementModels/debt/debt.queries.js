const Debt = require('./debt.Schema');
const Debtor = require('../newdebt/Register');

// Crear una nueva deuda asociada a un deudor
const createDebt = async (debtorId, debtData) => {

  debtData.debtor = debtorId;

  const newDebt = new Debt(debtData);
  const savedDebt = await newDebt.save();
  
  await Debtor.findByIdAndUpdate(debtorId, { $push: { debts: savedDebt._id } });
  return savedDebt;
};

// Obtener una deuda por ID
const getDebtById = async (debtId) => {
  return await Debt.findById(debtId).populate('debtor');
};

// Eliminar una deuda
const deleteDebt = async (debtId) => {
  const debt = await Debt.findById(debtId);
  await Debtor.findByIdAndUpdate(debt.debtor, { $pull: { debts: debtId } });
  return await debt.remove();
};

module.exports = {
  createDebt,
  getDebtById,
  deleteDebt,
};
