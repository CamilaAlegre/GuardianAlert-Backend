const express = require('express');
const router = express.Router();
const DB_Usuarios = require('./DB_Usuarios');

const usuariosController = new DB_Usuarios();

router.post('/agregarusuario', async (req, res) => {
  try {
    const usuario = req.body;
    await usuariosController.agregarUsuario(usuario);
    res.status(201).json({ mensaje: 'Usuario agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar un usuario:', error);
    res.status(500).json({ error: 'Se produjo un error al agregar el usuario' });
  }
});

// Ruta para consultar usuarios por email
router.get('/:consultarusuarioemail', async (req, res) => {
  try {
    const email = req.params.email;
    const usuario = await usuariosController.consultarUsuario(email);
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al consultar usuario:', error);
    res.status(500).json({ error: 'Se produjo un error al consultar el usuario' });
  }
});

// Ruta para modificar usuarios
router.put('/modificarusuario', async (req, res) => {
  try {
    const usuario = req.body;
    await usuariosController.modificarUsuario(usuario);
    res.status(200).json({ mensaje: 'Usuario modificado correctamente' });
  } catch (error) {
    console.error('Error al modificar un usuario:', error);
    res.status(500).json({ error: 'Se produjo un error al modificar el usuario' });
  }
});

// Ruta para eliminar usuarios
router.delete('/eliminarusuario', async (req, res) => {
  try {
    const email = req.body.email;
    await usuariosController.eliminarUsuario(email);
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Se produjo un error al eliminar el usuario' });
  }
});

module.exports = router;
