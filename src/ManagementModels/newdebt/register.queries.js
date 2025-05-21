const Debtor = require('./Register');
const Debt = require('../debt/debt.Schema')
const mongoose = require('mongoose');

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
const updateDebtorStatus = async (debtorId, newStatus) => {
  try {
    const debtor = await Debtor.findById(debtorId);
    if (!debtor) {
      console.log("updateDebtorStatus: Deudor no encontrado para el ID:", debtorId);
      return null;
    }
    console.log("updateDebtorStatus: Estado actual:", debtor.status, "y visible:", debtor.visible);
    
    // Actualizamos el estado y la visibilidad
    debtor.status = newStatus;
    // Si el nuevo estado es 'inactive', visible pasa a false; de lo contrario, true.
    debtor.visible = newStatus !== 'inactive';
    console.log("updateDebtorStatus: Actualizando deudor a estado:", newStatus, "y visible:", debtor.visible);
    
    const updatedDebtor = await debtor.save();
    console.log("updateDebtorStatus: Deudor actualizado:", updatedDebtor);
    return updatedDebtor;
  } catch (error) {
    throw new Error(`Error actualizando el estado del deudor: ${error.message}`);
  }
};
// visivilidad de las deudas 
const visibilityDebtor = async(debtorId, visibility) =>{
  try{
    const result = await Debt.updateMany({debtor: debtorId}, {visible: visibility});
    return result;

  }catch(error){
    throw new Error(`Error al actualizar la visibilidad : ${error.message}`);
  }
};
const createNewdebtsToDebtor = async (debtorId, debtDataArray) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(debtorId)) {
      console.log('id recibido no valido', debtorId);
      throw new Error('ID de deudor no válido');
    }

    const objectId = new mongoose.Types.ObjectId(debtorId);

    const debtor = await Debtor.findById(objectId);
    if (!debtor) {
      throw new Error('Deudor no encontrado');
    }

    if (!Array.isArray(debtDataArray) || debtDataArray.length === 0) {
      throw new Error('No se proporcionaron deudas válidas para registrar');
    }

    const newDebt = debtDataArray.map(debt => ({
      ...debt,
      debtor: objectId,
    }));

    const savedDebt = await Debt.insertMany(newDebt);
    const newDebtIds = savedDebt.map(debt => debt._id);
    debtor.debts.push(...newDebtIds);

    await debtor.save();

    return savedDebt;
  } catch (error) {
    throw new Error(`error al crear y asignar la deuda: ${error.message}`);
  }
};
// obtener ids de las deudas asociados a un  deudor
const getDebtIdsByDebtorId = async (debtorId) => {
  try {
    const debtor = await Debtor.findById(debtorId).select('debts');
    if (!debtor) throw new Error('Deudor no encontrado');
    return debtor.debts.map(debt => debt.toString());
  } catch (error) {
    throw new Error(`Error al obtener deudas del deudor: ${error.message}`);
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
  updateDebtorStatus,
  visibilityDebtor,
  createNewdebtsToDebtor,
  getDebtIdsByDebtorId,
  deleteDebtor,
};
