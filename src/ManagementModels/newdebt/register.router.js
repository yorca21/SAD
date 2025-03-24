const { Router } = require('express'); 
const router = Router();
const registerController = require('./register.controller');
const upload = require('../../helpers/uploadConfig')
const { authenticateToken, authorizeRoles } = require('../../helpers/authMiddleware');


// Ruta para crear un nuevo registro
router.post('/', [authenticateToken, authorizeRoles(['super administrador', 'administrador']), upload.single('file')], registerController.createDebtor);

// Ruta para obtener todos los registros
router.get('/', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.getAllDebtors);

// Ruta para buscar registros por criterios específicos
router.post('/search', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.searchDebtors);

// Ruta para obtener un registro por su ID
router.get('/:id', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.getDebtorById);

// Ruta para actualizar un registro por su ID
router.put('/:id', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.updateDebtor);

router.put('/:id/status', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.updateDebtorStatus);
// Ruta para eliminar un registro por su ID
router.delete('/:id', [authenticateToken, authorizeRoles(['super administrador', 'administrador'])], registerController.deleteDebtor);

module.exports = router; 
