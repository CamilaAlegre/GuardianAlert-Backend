// contactosEmergenciaRoutes.js
const express = require('express');
const router = express.Router();

// Importa el controlador de contactos de emergencia
const contactosEmergenciaController = require('./DB_ContactosEmergencia');

// Ruta para agregar un contacto de emergencia
router.post('/', async (req, res) => {
  try {
    const contactoEmergencia = req.body;
    await contactosEmergenciaController.agregarContactoEmergencia(contactoEmergencia);
    res.status(201).json({ mensaje: 'Contacto de emergencia agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar un contacto de emergencia:', error);
    res.status(500).json({ error: 'Se produjo un error al agregar el contacto de emergencia' });
  }
});

// Ruta para consultar contactos de emergencia por usuarioemail
router.get('/:usuarioemail', async (req, res) => {
  try {
    const usuarioemail = req.params.usuarioemail;
    const contactos = await contactosEmergenciaController.consultaContactosdeEmergencia(usuarioemail);
    res.status(200).json(contactos);
  } catch (error) {
    console.error('Error al consultar contactos de emergencia:', error);
    res.status(500).json({ error: 'Se produjo un error al consultar los contactos de emergencia' });
  }
});

// Ruta para eliminar contactos de emergencia
router.delete('/', async (req, res) => {
  try {
    const filtro = req.body;
    await contactosEmergenciaController.eliminarContactosDeEmergencia(filtro);
    res.status(200).json({ mensaje: 'Contactos de emergencia eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar contactos de emergencia:', error);
    res.status(500).json({ error: 'Se produjo un error al eliminar los contactos de emergencia' });
  }
});


module.exports = router;
