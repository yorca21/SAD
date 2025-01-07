const Debt = require('./debt.Schema');
const Debtor = require('../newdebt/Register');
//const Unit = require('../../modules/unit/unit.schema')

// Crear una nueva deuda asociada a un deudor
const createDebt = async (debtorId, debtData) => {
  try {
       
      // Validación de datos
    if (!debtorId || !debtData || !debtData.amount || !debtData.recordDate || !debtData.unit) {
      throw new Error('Datos incompletos para crear una deuda.');
    }

    // Verificar si el deudor existe
    const debtorExists = await Debtor.findById(debtorId);
    if (!debtorExists) {
      throw new Error('El deudor especificado no existe.');
    }

    // Crear la deuda y asociarla al deudor
    debtData.debtor = debtorId;
    const newDebt = new Debt({
      ...debtData,
      debtor: debtorId,
    });
    const savedDebt = await newDebt.save();

    // Asociar la deuda al deudor
    await Debtor.findByIdAndUpdate(debtorId, { $push: { debts: savedDebt._id } });

    // Devolver la deuda creada
    return savedDebt;
  } catch (error) {
    console.error('Error en createDebt:', error.message);
    throw new Error(`Error al crear la deuda: ${error.message}`);
  }
};

// Obtener una deuda por ID
const getDebtById = async (debtId) => {
  return await Debt.findById(debtId).populate('debtor').populate('unit', 'name');
};

// Obtener todas las deudas visibles
const getAllVisibleDebts = async () => {
  return await Debt.find({ isVisible: true }).populate('debtor').populate('unit', 'name');
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
  getAllVisibleDebts,
  deleteDebt,
};
