const express = require('express');
const app = express();

app.use(express.json());
// Importa la clase NeuralNetwork

app.get('/train', async(req, res) => {



  const datos = [
    { timestamp: 1, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 2, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 3, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 4, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 5, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 6, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    // Más datos aquí
  ];
  const AlgoTensor = require('../../AlgoTensor');

  const tensor = new AlgoTensor();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const Calculador = require('../../Calculador');
  const algoritmo = new Calculador();

  function obtenerCampos() {
    const campos = algoritmo.calcularCaracteristicas(datos);

    return campos;
  }

  const campos = obtenerCampos();
  /*
  const inputForPrediction = [
    campos[0],
    campos[1],
    campos[2],
    campos[3],
    tensor.activityToNumeric('SDL'),
    campos[4],
    campos[5],
    campos[6],
    campos[7],
    campos[8],
  ];*/
  const inputForPrediction = [
    26.039918537018742,
    7.309796699430188,
    20.378162104442573,
    2.7824758875712914,
    tensor.activityToNumeric('SDL'),
    11.131079696122551,
    3.8913614045630966,
    1.5929268156092316,
    7.086617599915782,
    10.790400250203442,
  ];
  
  try {
    // Cargar los datos
  const prediction= await tensor.loadCSVData('../../Train.csv', trainingOptions, inputForPrediction);
  
  res.send(`Predicción: ${JSON.stringify(prediction.dataSync())}`);
  
  } catch (error) {
    console.error('Error durante la predicción:', error);
  }
  });
/*
// Definir una ruta para cargar datos CSV y entrenar la red neuronal
app.get('/trainp', (req, res) => {
  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const datos = req.body.datos; 
  const campos = req.body.campos; 

  neuralNetwork.loadCSVData('./Train.csv', trainingOptions, campos);

  res.json({ message: 'Entrenamiento iniciado.' });
});


*/
const port =process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}...`));




