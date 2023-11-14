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

  it('debería enviar un mensaje', async () => {
    const chatId = '1119289333';
    const message = 'Hola, esto es un mensaje de prueba';

    // Llama al método sendMessage
    await telegram.sendMessage(chatId, message);

    // Verifica que se haya llamado a sendMessage con los argumentos correctos
    expect(telegram.bot.sendMessage).toHaveBeenCalledWith(chatId, message);

    // Verifica si la función sendMessage fue llamada al menos una vez
    expect(telegram.bot.sendMessage).toHaveBeenCalled();


    
  });

  it('debería enviar una ubicación', async () => {
    const chatId = '1119289333';
    const latitude = 37.7749;
    const longitude = -122.4194;

    // Llama al método sendLocation
    await telegram.sendLocation(chatId, latitude, longitude);
    // Verifica que se haya llamado a sendLocation con los argumentos correctos
    expect(telegram.bot.sendLocation).toHaveBeenCalledWith(chatId, latitude, longitude);

    // Verifica si la función sendLocation fue llamada al menos una vez
    expect(telegram.bot.sendLocation).toHaveBeenCalled();

  });
});
