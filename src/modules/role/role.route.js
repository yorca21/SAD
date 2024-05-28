const express = require('express');
const router = express.Router();
const Role = require('./role.schema');

// Creacion del rol
router.post('/role', async (req, res) => {
  const { name, permissions } = req.body;

  let role = new Role({ name, permissions });

  try {
    await role.save();
    res.status(201).send('Rol creado');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
