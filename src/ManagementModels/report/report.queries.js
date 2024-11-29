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
  
    // Realizar la consulta y popular deudas relacionadas
    return await Debtor.find(query).populate('debts');
  };
  
  module.exports = { getDebtorsByCriteria };