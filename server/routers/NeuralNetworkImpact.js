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








    if (isImpact) {
      const Evento = require('../Evento');
  
      const evento = new Evento(
        datos.usuario,
        datos.emailusuario,
        datos.fecha,
        datos.hora,
        datos.lugar,
       'Activo'
      );
  
      const chatIds = ['1119289333', '6308381260'];
  
      const latitude = 37.7749;
      const longitude = -122.4194;
  
      // Send messages and locations to chatIds using Telegram class
      telegram.sendMessageAndLocationToChatIds(chatIds, evento, latitude, longitude)
        .then(() => {
          console.log('Mensajes y ubicaciones enviados con éxito a los chatIds');
        })
        .catch((error) => {
          console.error('Error al enviar mensajes y ubicaciones:', error);
        });
    }
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).send('Internal Server Error');
  }
  



  








});

const port =process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}...`));
