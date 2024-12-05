const express = require('express');
const { generateDebtorPDF } = require('./preview.controller');

const router = express.Router();
router.post('/generate-pdf', generateDebtorPDF);

module.exports = router;
 