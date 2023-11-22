const express = require('express');
const app = express();

app.use(express.json());
const Telegram = require('./Telegram'); // Adjust the path as needed
const telegram = new Telegram();

app.get('/impactos', async (req, res) => {
  const datosCodificados = req.query.data;
  const datosJSON = decodeURIComponent(datosCodificados);
  const datos = JSON.parse(datosJSON);

  const AlgoTensorImpacto2 = require('../../AlgoTensorImpacto2');
  const tensor = new AlgoTensorImpacto2();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  try {

    const prediction = await tensor.loadCSVData('../../completoimpactos.csv', trainingOptions, datos);

    const threshold = 0.5; 
    const isImpact = prediction.dataSync()[0] >= threshold;

    res.send({
      input: inputForPrediction,
      prediction: isImpact,
    });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).send('Internal Server Error');
  }
  
});

const port =process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}...`));
