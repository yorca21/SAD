const Debtor = require('./Register');

// Crear un nuevo deudor
const createDebtor = async (debtorData) => {
  const newDebtor = new Debtor(debtorData);
  return await newDebtor.save();
};

// Obtener todos los deudores
const getAllDebtors = async () => {
  return await Debtor.find().populate('debts');
};

// Obtener un deudor por ID
const getDebtorById = async (debtorId) => {
  return await Debtor.findById(debtorId).populate('debts');
};
// Función para buscar deudores por criterios dinámicos
const searchDebtors = async (criteria) => {
    const query = {};
  
    // Si el criterio de nombre de deudor existe, añádelo a la consulta
    if (criteria.name) {
      query.name = new RegExp(criteria.name, 'i');  // Búsqueda insensible a mayúsculas/minúsculas
    }
  
    // Si el criterio de CI existe, añádelo a la consulta
    if (criteria.ci) {
      query.ci = criteria.ci;
    }
  
    // Si el criterio de estado existe, añádelo a la consulta
    if (criteria.status) {
      query.status = criteria.status;
    }
  
    // Si el criterio de deuda específica existe (por ejemplo, por un ID de deuda)
    if (criteria.debtId) {
      query.debts = criteria.debtId;
    }
  
    try {
      // Realiza la búsqueda con los criterios dinámicos
      const debtors = await Register.find(query).populate('Debt');  // Poblará las deudas asociadas
      return debtors;
    } catch (error) {
      throw new Error('Error al buscar deudores');
    }
  };
  
// Actualizar un deudor
const updateDebtor = async (debtorId, updateData) => {
  return await Debtor.findByIdAndUpdate(debtorId, updateData, { new: true });
};

// Eliminar un deudor
const deleteDebtor = async (debtorId) => {
  return await Debtor.findByIdAndDelete(debtorId);
};

module.exports = {
  createDebtor,
  getAllDebtors,
  getDebtorById,
  searchDebtors,
  updateDebtor,
  deleteDebtor,
};
