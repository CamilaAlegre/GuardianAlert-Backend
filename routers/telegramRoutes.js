const express = require('express');
const app = express();

app.use(express.json());

app.get('/telegram', async(req, res) => {

  const datosCodificados = req.query.data;
  const datosJSON = decodeURIComponent(datosCodificados);
  const datos = JSON.parse(datosJSON);
  
  try {
      const Evento = require('../Evento');
  
      const evento = new Evento(
        datos.usuario,
        datos.emailusuario,
        datos.fecha,
        datos.hora,
        datos.lugar,
        datos.estado
      );
  
      const chatIds = await mongoManager.consultaContactosdeEmergencia(datos.emailusuario);

      const latitude = datos.latitude;
      const longitude = datos.longitude
  
      // Send messages and locations to chatIds using Telegram class
      telegram.sendMessageAndLocationToChatIds(chatIds, evento, latitude, longitude)
        .then(() => {
          console.log('Mensajes y ubicaciones enviados con éxito a los chatIds');
        })
        .catch((error) => {
          console.error('Error al enviar mensajes y ubicaciones:', error);
        });
    
  } catch (error) {
    console.error('Error al enviar mensjae de telegram:', error);
    res.status(500).send('Internal Server Error');
  } 
});

const port =process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}...`));
