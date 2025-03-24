const express = require('express');
const router = express.Router();
const { generateReceipt } = require('./voucher.controller');

// Ruta para generar el PDF
router.get('/voucher/:debtId', generateReceipt);

module.exports = router;
