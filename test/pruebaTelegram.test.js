const TelegramBot = require('node-telegram-bot-api');
const Telegram = require('../Telegram');

// Mock para simular node-telegram-bot-api
jest.mock('node-telegram-bot-api');

describe('Pruebas para la clase Telegram', () => {
  let telegram;

  beforeEach(() => {
    // Reinicia el mock antes de cada prueba
    jest.clearAllMocks();

    // Configura el mock para TelegramBot
    TelegramBot.mockImplementation(() => ({
      sendMessage: jest.fn(),
      sendLocation: jest.fn(),
    }));

    // Crea una instancia de la clase Telegram
    telegram = new Telegram();
  });

  it('debería enviar un mensaje', () => {
    const chatId = '123456';
    const message = 'Hola, esto es un mensaje de prueba';

    // Llama al método sendMessage
    telegram.sendMessage(chatId, message);

    // Verifica que se haya llamado a sendMessage con los argumentos correctos
    expect(TelegramBot.prototype.sendMessage).toHaveBeenCalledWith(chatId, message);
  });

  it('debería enviar una ubicación', () => {
    const chatId = '123456';
    const latitude = 37.7749;
    const longitude = -122.4194;

    // Llama al método sendLocation
    telegram.sendLocation(chatId, latitude, longitude);

    // Verifica que se haya llamado a sendLocation con los argumentos correctos
    expect(TelegramBot.prototype.sendLocation).toHaveBeenCalledWith(chatId, latitude, longitude);
  });

  it('debería enviar mensajes y ubicaciones a varios chatIds', async () => {
    const chatIds = ['1119289333', '6308381260'];
    const evento = {
      usuario: 'Camila Anahi Alegre',
      fecha: '2023-09-18',
      hora: '15:30:00',
      estado: 'Caida',
    };
    // Llama al método sendMessageAndLocationToChatIds
    await telegram.sendMessageAndLocationToChatIds(chatIds, evento, latitude, longitude);

    // Verifica que se haya llamado a sendMessage y sendLocation para cada chatId
    chatIds.forEach((chatId) => {
      const message = expect.stringContaining(`Hola, el usuario ${evento.usuario} le ocurrió un ${evento.estado} el ${evento.fecha} a las ${evento.hora}`);
      expect(TelegramBot.prototype.sendMessage).toHaveBeenCalledWith(chatId, message);
      expect(TelegramBot.prototype.sendLocation).toHaveBeenCalledWith(chatId, latitude, longitude);
    });
  });
});
