const express = require('express');
const app = express();

app.use(express.json());

app.get('/golpes', async(req, res) => {

  const datosCodificados = req.query.data;

  const datosJSON = decodeURIComponent(datosCodificados);
  const datos = JSON.parse(datosJSON);

  
  const AlgoTensorGolpes = require('../../AlgoTensorGolpes');

  const tensor = new AlgoTensorGolpes();


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
  
  const inputForPrediction = [
    campos[0],
    campos[1],
    campos[2],
    campos[3],
    //tensor.activityToNumeric('SDL'),
    campos[4],
    campos[5],
    campos[6],
    campos[7],
    campos[8],
  ];
  try {
    // Cargar los datos
  const prediction= await tensor.loadCSVData('../../DatasetGolpes.csv', trainingOptions, inputForPrediction);
  
  res.send(`Predicción: ${JSON.stringify(prediction.dataSync())}`);
  
  } catch (error) {
    console.error('Error durante la predicción:', error);
  }
  });

const port =process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}...`));
