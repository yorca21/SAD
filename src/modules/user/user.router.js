const Router = require('express')
const { getUsers } = require('./user.controller')
const router = Router()
router.get('/', getUsers)

// router.get('/:id',)
// router.post('/',)
// router.put('/:id',)
// router.delete('/:id',)
module.exports = router