const express = require('express');
const router = express.Router();

const alertasController = require('./DB_Alertas');

// Ruta para agregar una alerta
router.post('/agregaralerta', async (req, res) => {
  try {
    const alerta = req.body;
    await alertasController.agregarHistorialEventos(alerta);
    res.status(201).json({ mensaje: 'Alerta agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar una alerta:', error);
    res.status(500).json({ error: 'Se produjo un error al agregar la alerta' });
  }
});

// Ruta para consultar alertas por emailusuario
router.get('/:consultaralertaemailusuario', async (req, res) => {
  try {
    const emailusuario = req.params.emailusuario;
    const alertas = await alertasController.consultasdealertas(emailusuario);
    res.status(200).json(alertas);
  } catch (error) {
    console.error('Error al consultar alertas:', error);
    res.status(500).json({ error: 'Se produjo un error al consultar las alertas' });
  }
});


module.exports = router;
