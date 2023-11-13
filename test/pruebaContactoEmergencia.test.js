
const { MongoClient } = require('mongodb');
const DB_ContactosEmergencia = require('../DB_ContactosEmergencia');

// Mock para MongoDB
jest.mock('mongodb');

describe('DB_ContactosEmergencia', () => {
  let dbContactosEmergencia;
  let mockCollection;

  beforeAll(() => {
    dbContactosEmergencia = new DB_ContactosEmergencia();

    // Mock para la colección de MongoDB
    mockCollection = {
      insertOne: jest.fn(),
      find: jest.fn(),
      toArray: jest.fn(),
      deleteMany: jest.fn(),
    };

    // Mock para la conexión de MongoDB
    const mockDb = {
      collection: jest.fn(() => mockCollection),
    };
    const mockClient = {
      connect: jest.fn(),
      db: jest.fn(() => mockDb),
      close: jest.fn(),
    };

    MongoClient.mockImplementation(() => mockClient);
  });

  afterAll(() => {
    // Restaurar la implementación original de MongoClient después de todas las pruebas
    jest.restoreAllMocks();
  });

  describe('agregarContactoEmergencia', () => {
    it('Deberia agregar un contacto a la base de datos', async () => {
      const contactoEmergencia = {
        usuarionombreyapellido: 'Usuario Prueba',
        usuarioemail: 'test@example.com',
        nombre: 'Contacto Emergencia',
        telefono: '123456789',
        email: 'emergency@example.com',
        relacion: 'Amigo',
      };

      // Simular inserción en la base de datos
      mockCollection.insertOne.mockResolvedValueOnce({ insertedId: 'someId' });

      await dbContactosEmergencia.agregarContactoEmergencia(contactoEmergencia);

      // Verificar si la función de inserción se llamó correctamente
      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        usuarionombreyapellido: 'Usuario Prueba',
        usuarioemail: 'test@example.com',
        nombre: 'Contacto Emergencia',
        telefono: '123456789',
        email: 'emergency@example.com',
        relacion: 'Amigo',
      });
    });
  });

  describe('consultaContactosdeEmergencia', () => {
    it('Deberia consultar usuario por email', async () => {
      const usuarioemail = 'test@example.com';

      // Simular la consulta en la base de datos
      mockCollection.find.mockReturnValueOnce({
        toArray: jest.fn().mockResolvedValueOnce([{ name: 'Contact1' }, { name: 'Contact2' }])
      });

      const result = await dbContactosEmergencia.consultaContactosdeEmergencia(usuarioemail);

      // Verificar si la función de consulta se llamó correctamente
      expect(mockCollection.find).toHaveBeenCalledWith({ usuarioemail: 'test@example.com' });
      // Verificar el resultado
      expect(result).toEqual([{ name: 'Contact1' }, { name: 'Contact2' }]);
    });
  });

  describe('eliminarContactosDeEmergencia', () => {
    it('Deberia eliminar un contactos de usuario por filtro', async () => {
      const filtro = { usuarioemail: 'test@example.com',  telefono: 11251426};

      // Simular la eliminación en la base de datos
      mockCollection.deleteMany.mockResolvedValueOnce({ deletedCount: 1 });

      await dbContactosEmergencia.eliminarContactosDeEmergencia(filtro);

      // Verificar si la función de eliminación se llamó correctamente
      expect(mockCollection.deleteMany).toHaveBeenCalledWith({ usuarioemail: 'test@example.com', telefono: 11251426 });
    });
  });
});
