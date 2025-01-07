const Debtor = require('../newdebt/Register');

const getDebtorsByCriteria = async ({ status, startDate, endDate }) => {
  const query = {};

  // Filtro por estado
  if (status) {
    query.status = status;
  }

  // Filtro por rango de fechas
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    // Buscar deudores con deudas y unidades asociadas
    const debtors = await Debtor.find(query)
      .populate({
        path: 'debts',
        select: 'amount unit', // Nos aseguramos de traer el campo 'unit'
      });

    return debtors;
  } catch (error) {
    console.error('Error al obtener deudores:', error);
    throw error;
  }
};

module.exports = { getDebtorsByCriteria };
