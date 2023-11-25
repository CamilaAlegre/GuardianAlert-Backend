const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

class Telegram {
  constructor() {
    // Utiliza una variable de entorno para almacenar el token de Telegram
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.bot = new TelegramBot(this.token, { polling: false });
  }

  // Método para enviar un mensaje
  sendMessage(chatId, message) {
    // Envolvemos la llamada en un array
    const promises = [this.bot.sendMessage(chatId, message)];
    return Promise.all(promises);
  }

  // Método para enviar una ubicación
  sendLocation(chatId, latitude, longitude) {
    return this.bot.sendLocation(chatId, latitude, longitude);
  }

  async sendMessageAndLocationToChatIds(chatIds,decodedToken ,event, latitude, longitude) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
   
    const userName = decodedToken.name;
    const userLastName = decodedToken.lastname;
    const user = `${userName} ${userLastName}`;

    const promises = chatIds.map(async (chatId) => {
      try {
        const message = `Hola, el usuario ${user} tuvo un accidente de tipo ${event} el ${formattedDate} a las ${formattedTime} y se encuentra en la siguiente ubicación`;
  
        // Enviar mensaje
        await this.sendMessage(chatId, message);
  
        // Enviar ubicación con datos de latitud y longitud
        await this.sendLocation(chatId, latitude, longitude);
      } catch (error) {
        console.error('Error al enviar mensaje o ubicación:', error);
      }
    });
  
    return Promise.all(promises);
  }
  
  
}

module.exports = Telegram;
