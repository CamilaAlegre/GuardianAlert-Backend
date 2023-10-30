const express = require('express');
const router = express.Router();

//Recibir datos de sensores desde el front
router.post("/sensors", (req, res) => {
    try {
      console.log('Received POST request with data:', req.body);
      // Resto del código para procesar los datos
      // Enviar una respuesta exitosa
      res.status(200).send('Datos recibidos con éxito.');
    } catch (error) {
      console.error('Error al procesar los datos:', error);
      // Enviar una respuesta de error
      res.status(500).send('Error al procesar los datos.');
    }
  });

module.exports = router;

