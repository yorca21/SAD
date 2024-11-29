const { Router } = require('express'); 
const router = Router();
const { generateDebtorReport } = require('./report.controller');

// Ruta para obtener reporte en JSON (temporal)
router.get('/debtors', generateDebtorReport);

module.exports = router;
