const express = require('express');
const router = express.Router();

// Importa la clase NeuralNetwork
const NeuralNetwork = require('./NeuralNetwork2');

// Crea una instancia de la clase NeuralNetwork
const neuralNetwork = new NeuralNetwork();

// Definir una ruta para cargar datos CSV y entrenar la red neuronal
router.post('/trainimpact', (req, res) => {
  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const datos = req.body.datos; 
  const campos = req.body.campos; 

  neuralNetwork.loadCSVData('./TrainImpact.csv', trainingOptions, campos);

  res.json({ message: 'Entrenamiento iniciado.' });
});

router.post('/predictimpact', (req, res) => {
  const inputForPrediction = req.body.inputForPrediction;

  //const prediction = neuralNetwork.predict(inputForPrediction);

  res.json({ prediction });
});

module.exports = router;
