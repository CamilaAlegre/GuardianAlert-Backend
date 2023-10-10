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

// ID del chat del usuario que envía el mensaje
const senderChatId = '1119289333';

const estadoalerta='Golpeo';
// El mensaje que deseas enviar
const message = 'Hola, el usuario se '+estado+ ' y se encuentra en la siguiente ubicación';

// Envía el mensaje
botManager.sendMessage(senderChatId, message)
  .then(() => {
    // Coordenadas de la ubicación (latitud y longitud)
const latitude = 37.7749;
const longitude = -122.4194;

// Envía la ubicación
botManager.sendLocation(senderChatId, latitude, longitude)
  .then(() => {
    console.log('Ubicación enviada con éxito');
  })
  .catch((error) => {
    console.error('Error al enviar la ubicación:', error);
  });
  })
  .catch((error) => {
    console.error('Error al enviar el mensaje desde el usuario que envía:', error);
  });


