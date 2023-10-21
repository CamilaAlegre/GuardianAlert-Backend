const TelegramBot = require('node-telegram-bot-api');


class TelegramBotManager {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: false });
  }

  // Método para enviar un mensaje
  sendMessage(chatId, message) {
    return this.bot.sendMessage(chatId, message);
  }

  // Método para enviar una ubicación
  sendLocation(chatId, latitude, longitude) {
    return this.bot.sendLocation(chatId, latitude, longitude);
  }
}

// Reemplaza 'TU_TOKEN' con el token de acceso de tu bot de Telegram
const token = '6600696741:AAE2HrAyuZYJE9w1XCh24yfWsHEcagqsnlo';

// Crea una instancia de TelegramBotManager
const botManager = new TelegramBotManager(token);

const Evento = require('./Evento'); 

const evento = new Evento(
  'Camila Anahi Alegre',
  'ejemplo@example.com',
  '2023-09-18',
  '15:30:00',
  'Ejemplo City',
  'Activo'
);

const chatIds = ['1119289333','6308381260'];

const message = 'Hola, el usuario '+evento.usuario+ ' le ocurrió un '+ evento.estado+' y se encuentra en la siguiente ubicación';
const latitude = 37.7749;
const longitude = -122.4194;
// Envía el mensaje
chatIds.forEach((chatId) => {
  botManager.sendMessage(chatId, message)
    .then(() => {
      // Envía la ubicación
      botManager.sendLocation(chatId, latitude, longitude)
        .then(() => {
          console.log('Ubicación enviada con éxito a ' + chatId);
        })
        .catch((error) => {
          console.error('Error al enviar la ubicación a ' + chatId + ':', error);
        });
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje a ' + chatId + ':', error);
    });
});

