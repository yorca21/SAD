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
      // Buscar deudores según los filtros
      const debtors = await Debtor.find(query).populate('debts');  // Asegúrate de que estés poblando las deudas si es necesario
      return debtors;
    } catch (error) {
      console.error('Error al obtener deudores:', error);
      throw error;
    }
  };
  
  module.exports = { getDebtorsByCriteria };