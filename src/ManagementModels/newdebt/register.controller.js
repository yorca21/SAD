const DebtQueries = require('../debt/debt.queries');
const { generateVoucherIfNeeded } = require('../Proof/voucher.controller');
const DebtorQueries = require('./register.queries');

// Controlador para crear un nuevo deudor 
const createDebtor = async (req, res) => {
  console.log('BODY RECIBIDO:', req.body);
  try {
    const { name, paternalsurname, maternalsurname, ci, status, debts } = req.body;
    console.log('BODY RECIBIDO:', req.body);
    // Acceder al archivo subido
    const file = req.file;
    console.log("Archivo recibido:", req.file);

    // Crear el nuevo deudor con la información recibida
    const debtorData = {
      name,
      paternalsurname,
      maternalsurname,
      ci,
      status,
      file: file ? file.path : null, // Guardar la ruta del archivo si fue subido
    };

    // Crear el deudor en la base de datos
    const newDebtor = await DebtorQueries.createDebtor(debtorData);

    // Procesar y crear deudas si están presentes
    if (debts) {
      const parsedDebts = Array.isArray(debts) ? debts : JSON.parse(debts);
      const debtPromises = parsedDebts.map(debt =>{
        if(!debt.unit){
            throw new Error('El registro de deudas debe contar el ID de la unidad en la que se genero.')
        }

           return  DebtQueries.createDebt(newDebtor._id, debt)
      });
      await Promise.all(debtPromises);
    }

    return res.status(201).json({ 
      message: 'Deudor creado exitosamente', 
      debtor: newDebtor 
    });
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
  const debtorId = req.params.id;
  const { debts, ...debtorUpdates } = req.body;
  const file = req.file;

  console.log('Id recibido:', debtorId);
  console.log('DATA DEBTOR UPDATE:', debtorUpdates);
  console.log('DEBTS:', debts);
  

  try {
    const existingDebtor = await DebtorQueries.getDebtorById(debtorId);
    if (!existingDebtor) {
      return res.status(400).json({ message: 'Deudor no encontrado' });
    }

    // Si hay nuevo archivo, usarlo. Si no, mantener el anterior
    if (file) {
      debtorUpdates.file = file.path;
    } else {
      debtorUpdates.file = existingDebtor.file;
    } 

    // Actualizamos datos generales del deudor (sin tocar deudas)
    if (Object.keys(debtorUpdates).length > 0) {
      await DebtorQueries.updateDebtor(debtorId, debtorUpdates);
    }

    let savedDebts = [];
    if (Array.isArray(debts) && debts.length > 0) {
      const existingDebts = existingDebtor.debts;

      // Filtrar deudas nuevas que no existan aún
      const newDebts = debts.filter(newDebt => {
        // Si ya existe por ID, ignorar
        if (newDebt._id && existingDebts.some(d => d._id.toString() === newDebt._id)) {
          return false;
        }

        // Comparación por valores
        const isDuplicate = existingDebts.some(existing => {
          const existingDate = new Date(existing.recordDate);
          const newDate = new Date(newDebt.recordDate);

          const sameDay =
            existingDate.getFullYear() === newDate.getFullYear() &&
            existingDate.getMonth() === newDate.getMonth() &&
            existingDate.getDate() === newDate.getDate();

          return (
            existing.description?.trim() === newDebt.description?.trim() &&
            Number(existing.amount) === Number(newDebt.amount) &&
            existing.unit?.toString() === newDebt.unit &&
            sameDay
          );
        });

        return !isDuplicate;
      });

      if (newDebts.length > 0) {
        savedDebts = await DebtorQueries.createNewdebtsToDebtor(debtorId, newDebts);
      }
    }

    return res.status(200).json({ 
      message: 'Datos actualizados exitosamente', 
      debts: savedDebts 
    });

  } catch (error) {
    console.error('Error actualizando el deudor:', error);
    return res.status(500).json({ message: 'Error actualizando el deudor', error: error.message });
  }
};

// Controlador para actualizar el estado del deudor
const updateDebtorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Nuevo estado enviado desde el frontend

    //console.log('parametros recibidos:', {id, status})

    const estadosValidos = ['pending', 'active', 'inactive'];
    if (!estadosValidos.includes(status)) {
      console.log('Estado no valido recibido:', status);
      return res.status(400).json({ message: 'Estado no válido.' });
    }

    const debtor = await DebtorQueries.getDebtorById(id);
   // console.log('deudor encontrado', debtor);
    if (!debtor) {
      return res.status(404).json({ message: 'Deudor no encontrado.' });
    }
    //actualizacion de la visivilidad mediante la funcion
    const updatedDetor  = await DebtorQueries.updateDebtorStatus(id, status);
    
    // generacion delk comprobante si el deudor oasa a un estado inactivo
    if(status ==='inactive'){

      const pdfBuffer = await generateVoucherIfNeeded(id, 'deudor');
      if(pdfBuffer){
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename=boleta_pago.pdf',
          'Content-Length': pdfBuffer.length,   
        });
        return res.send(pdfBuffer)
      }
    }
    return res.status(200).json({ message: `Estado actualizado a ${status}`, debtor:updatedDetor });
  } catch (error) {
    return res.status(500).json({ message: `Error al actualizar estado: ${error.message}` });
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
  updateDebtorStatus,
  deleteDebtor,
};
