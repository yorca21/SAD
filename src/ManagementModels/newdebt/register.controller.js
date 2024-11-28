const DebtQueries = require('../debt/debt.queries');
const DebtorQueries = require('./register.queries');

// Controlador para crear un nuevo deudor 
const createDebtor = async (req, res) => {
  try {
    const { name, ci, status, debts } = req.body;
    console.log("Datos recibidos en req.body:", req.body);

    // Acceder al archivo subido
    const file = req.file;
    console.log("Archivo recibido:", req.file);

    // Crear el nuevo deudor con la información recibida
    const debtorData = {
      name,
      ci,
      status,
      file: file ? file.path : null, // Guardar la ruta del archivo si fue subido
    };

    // Crear el deudor en la base de datos
    const newDebtor = await DebtorQueries.createDebtor(debtorData);

    // Procesar y crear deudas si están presentes
    if (debts) {
      const parsedDebts = Array.isArray(debts) ? debts : JSON.parse(debts);
      const debtPromises = parsedDebts.map(debt =>
        DebtQueries.createDebt(newDebtor._id, debt)
      );
      await Promise.all(debtPromises);
    }

    return res.status(201).json({ message: 'Deudor creado exitosamente', debtor: newDebtor });
  } catch (error) {
    console.error("Error al crear el deudor:", error);
    // Manejo de errores específico
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors });
    }
    return res.status(500).json({ message: 'Error al crear el deudor', error: error.message });
  }
};

// Controlador que obtiene todos los deudores 
const getAllDebtors = async (req, res) => {
  try {
    const debtors = await DebtorQueries.getAllDebtors();
    return res.status(200).json(debtors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para encontrar deudores por id 
const getDebtorById = async (req, res) => {
  try {
    const debtor = await DebtorQueries.getDebtorById(req.params.id);
    if (!debtor) return res.status(404).json({ message: 'Deudor no encontrado' });
    return res.status(200).json(debtor);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para realizar la búsqueda de deudores por criterios distintos
const searchDebtors = async (req, res) => {
  try {
    const { name, ci, status, debtId } = req.query; // Extracción directa de parámetros
    const criteria = { name, ci, status, debtId };
  
    const debtors = await DebtQueries.searchDebtors(criteria);
  
    if (debtors.length === 0) {
      return res.status(404).json({ message: 'No se encontraron deudores con los criterios proporcionados' });
    }
  
    return res.status(200).json(debtors);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar deudores', error: error.message });
  }
};
// Controlador que actualiza al deudor
const updateDebtor = async (req, res) => {
  const { id } = req.params;
  const { name, ci, status, debts } = req.body;

  try {
      // Actualizar datos principales del deudor
      const updatedDebtor = await DebtorQueries.updateDebtor(
          id, 
          { 
            name, 
            ci, 
            status 
          }
      );

      if (!updatedDebtor) {
          return res.status(404).json({ message: 'Deudor no encontrado' });
      }

      // Si hay deudas, procesarlas
      if (debts && debts.length) {
          const newDebts = await Promise.all(
              debts.map(debt => DebtQueries.createDebt(id, debt))
          );
          updatedDebtor.debts = newDebts.map(debt => debt._id);
          await updatedDebtor.save();
      }

      res.status(200).json({ message: 'Deudor actualizado exitosamente', debtor: updatedDebtor });
  } catch (error) {
      console.error('Error actualizando el deudor:', error);
      res.status(500).json({ message: 'Error actualizando el deudor', error: error.message });
  }
};

// Controlador para eliminar deudor 
const deleteDebtor = async (req, res) => {
  try {
    const debtorId = req.params.id;

    // Verifica si el deudor existe
    const debtor = await DebtorQueries.getDebtorById(debtorId);
    if (!debtor) return res.status(404).json({ message: 'Deudor no encontrado' });

    // Elimina el deudor
    await DebtorQueries.deleteDebtor(debtorId);

    return res.status(200).json({ message: 'Deudor eliminado', debtor });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDebtor,
  getAllDebtors, 
  getDebtorById,
  searchDebtors,
  updateDebtor,
  deleteDebtor,
};
