const TelegramBot = require('node-telegram-bot-api');


class TelegramBotManager {
  constructor() {
    this.token= '6600696741:AAE2HrAyuZYJE9w1XCh24yfWsHEcagqsnlo';
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


  sendMessageAndLocationToChatIds(chatIds, evento, latitude, longitude) {
    const promises = chatIds.map((chatId) => {
      const message = `Hola, el usuario ${evento.usuario} le ocurrió un ${evento.estado} el ${evento.fecha} a las ${evento.hora} y se encuentra en la siguiente ubicación`;
      return this.sendMessage(chatId, message)
        .then(() => this.sendLocation(chatId, latitude, longitude));
    });

    return Promise.all(promises);
  }

}

const botManager = new TelegramBotManager();

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

const latitude = 37.7749;
const longitude = -122.4194;
/// Envía mensajes y ubicaciones a los chatIds
botManager.sendMessageAndLocationToChatIds(chatIds,evento, latitude, longitude)
.then(() => {
  console.log('Mensajes y ubicaciones enviados con éxito a los chatIds');
})
.catch((error) => {
  console.error('Error al enviar mensajes y ubicaciones:', error);
});

