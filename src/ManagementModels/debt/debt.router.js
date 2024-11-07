const express = require('express');
const DebtControllers = require('./debt.controller');
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');

const router = express.Router();

// Rutas de deudas
router.post('/:debtorId/debts', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], DebtControllers.createDebt);
router.get('/:id', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], DebtControllers.getDebtById);
router.delete('/:id', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], DebtControllers.deleteDebt);

module.exports = router;
