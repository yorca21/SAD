const { generateVoucherIfNeeded } = require('../Proof/voucher.controller');
const DebtQueries = require('./debt.queries');

const createDebt = async (req, res) => {
  console.log('BODY RECIBIDO:', req.body);
  console.log('Archivos recibidos', req.file);
  try {
    const debtorId = req.params.debtorId;
    console.log('detor id', debtorId);
    if(!debtorId){
      return res.status(400).json({message:'El id del deudor es requerido.'});
    }
    // agregamos el file a la deuda
    if(req.file){
      req.body.filePath = req.file.path
    }
    const newDebt = await DebtQueries.createDebt(debtorId, req.body);
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
    return res.status(200).json('Duedas corrrepondientes',debts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//obtener deudas por id
const getDebtById = async (req, res) => {
  try {
    const debt = await DebtQueries.getDebtById(req.params.id);
    if (!debt) {
      return res.status(404).json({ message: 'Deuda no encontrada' });
    } 
    return res.status(200).json(debt);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateDebt = async (req, res)=>{
  try{
    const { id } = req.params;
    const updatedDebt = await DebtQueries.updateDebt(id, req.body);
    if (!updatedDebt){
      return res.status(404).json({message:'Deuda no encontrada.'});
    }
    return res.status(200).json({message:'Deuda actualizada exitosamente.', debt:updatedDebt,});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
};
// Cambiar visibilidad de una deuda
const toggleDebtVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    if (typeof isVisible !== 'boolean') {
      return res.status(400).json({ message: 'El campo "isVisible" debe ser booleano.' });
    }

    const updatedDebt = await DebtQueries.updateDebtVisibility(id, isVisible);
    if (!updatedDebt) {
      return res.status(404).json({ message: 'Deuda no encontrada.' });
    }

    if (!isVisible) {
      const debtorId = updatedDebt.debtor.toString();
      const pdfBuffer = await generateVoucherIfNeeded(debtorId, 'deuda',[id]);

      console.log('PDF generado:', pdfBuffer ? 'Sí' : 'No');

      if (pdfBuffer) {
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename=boleta_pago.pdf',
          'Content-Length': pdfBuffer.length,
        });

        return res.send(pdfBuffer);
      }
    }

    return res.status(200).json({ message: 'Deuda actualizada.', debt: updatedDebt });
  } catch (error) {
    console.error('Error en toggleDebtVisibility:', error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDebt = await DebtQueries.deleteDebt(id);
    if(!deletedDebt){
      return res.status(404).json({message:'Deuda no encontrada.'});
    }
    return res.status(200).json({
      message: 'Deuda eliminada exitosamente.',
      deletedDebt
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDebt,
  getAllDebts,
  getDebtById,
  updateDebt,
  toggleDebtVisibility,
  deleteDebt,
};
