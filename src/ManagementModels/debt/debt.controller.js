const DebtQueries = require('./debt.queries');

const createDebt = async (req, res) => {
  try {
    const newDebt = await DebtQueries.createDebt(req.params.debtorId, req.body);
    return res.status(201).json({
      message:'deuda creada de manera exitosa',
      debt: newDebt,
    });
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};
//controlador que maneja el estado de la deuda
const getAllDebts = async (req, res) => {
  try {
    const debts = await DebtQueries.getAllVisibleDebts();
    res.status(200).json('Duedas corrrepondientes',debts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDebtById = async (req, res) => {
  try {
    const debt = await DebtQueries.getDebtById(req.params.id);
    if (!debt) return res.status(404).json({ message: 'Deuda no encontrada' });
    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDebt = async (req, res) => {
  try {
    const deletedDebt = await DebtQueries.deleteDebt(req.params.id);
    res.status(200).json({
      message: 'Deuda eliminada',
      deletedDebt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDebt,
  getAllDebts,
  getDebtById,
  deleteDebt,
};
