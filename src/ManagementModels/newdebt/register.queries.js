const Debtor = require('./Register');
const Debt = require('../debt/debt.Schema')

// Crear un nuevo deudor
const createDebtor = async (debtorData) => {
  try{
    const newDebtor = new Debtor(debtorData);
    return await newDebtor.save();
}catch(error){
  throw new Error(`Error al crear deudor: ${error.message}`);
}
};0
// Obtener todos los deudores
const getAllDebtors = async () => {
  try{
    return await Debtor.find()
    .populate({
      path:'debts',
      populate:{
        path:'unit',
        select: 'name',
      }
  })
  .select('-__v');
}catch (error){
  throw new Error(`Error al obtener deudores: ${error.message}`);
}
};

// Obtener un deudor por ID
const getDebtorById = async (debtorId) => {
 try {
    return await Debtor.findById(debtorId)
      .populate({
        path: 'debts',
        populate: {
            path: 'unit', 
            select: 'name', 
        },
    }).select('-__v');
  }catch(error) {
    throw new Error(`Error al obtener el deudor: ${error.message}`);
  }
};
// Función para buscar deudores por criterios dinámicos
const searchDebtors = async (criteria) => {
  const query = {};

  if (criteria.name) {
      query.name = new RegExp(criteria.name, 'i'); // Búsqueda insensible a mayúsculas
  }
  if (criteria.ci) {
      query.ci = criteria.ci;
  }
  if (criteria.status) {
      query.status = criteria.status;
  }

  try {
      return await Debtor.find(query)
          .populate({
              path: 'debts',
              populate: {
                  path: 'unit',
                  select: 'name',
              },
          })
          .select('-__v'); // Excluir campos innecesarios
  } catch (error) {
      throw new Error(`Error al buscar deudores: ${error.message}`);
  }
};

// Actualizar un deudor
const updateDebtor = async (id, updateData) => {
  try {
      const options = { new: true, runValidators: true };
      const updatedDebtor = await Debtor.findByIdAndUpdate(id, updateData, options);

      return updatedDebtor;
  } catch (error) {
      throw new Error(`Error actualizando el deudor: ${error.message}`);
  }
};
const deactivateDebtor = async (debtorId) => {
  try{
    const debtor = await Debtor.findById(debtorId);
    if(!debtor){
      throw new Error('Deudor no encontrasdo.');
    }
    //Cambiar el estado de activo a inactivo 
    debtor.status = 'inactive';
    await debtor.save();

    // manejo de la visibilidad de las deudas 
    await Debt.updateMany({debtor: debtorId}, {$set:{ isVisible: false}});

    return {message:'El deudor y sus deudas fueron dados de baja esitosamente.'}

  }catch(error){
    throw new Error(`Ha ocurrido un error al procesar la solicitud: ${error.message} `);
  }
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
  deactivateDebtor,
  deleteDebtor,
};
