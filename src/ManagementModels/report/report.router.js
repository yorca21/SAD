const express = require('express');
const  { generateDebtorReport }  = require('./report.controller');

const router = express.Router();
// Ruta para generar reporte de deudores
router.get('/debtors',  generateDebtorReport);

module.exports = router;
