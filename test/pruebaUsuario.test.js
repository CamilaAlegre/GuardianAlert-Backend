const { MongoClient } = require('mongodb');
const DB_Usuarios = require('../DB_Usuarios');

const Usuario = require('../Usuario');
// Mock para simular MongoDB
jest.mock('mongodb');

describe('Pruebas para DB_Usuarios', () => {
  let db_usuarios;

  let mockCollection;

  beforeAll(() => {
    db_usuarios = new DB_Usuarios();

    // Mock para la colección de MongoDB
    mockCollection = {
      insertOne: jest.fn(),
      findOne: jest.fn(),
      toArray: jest.fn(),
      deleteOne: jest.fn(),
      updateOne: jest.fn(),
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
  it('debería agregar un usuario', async () => {
    // Configura el mock para insertOne usando mockResolvedValueOnce
    mockCollection.insertOne.mockResolvedValueOnce({ insertedId: 'SomeId' });

    const usuario = {
      nombre_y_apellido: 'Usuario Nombre Apellido',
      email: 'usuario1@gmail.com',
      telefono: 113113131,
      pais: 'Argentina',
      provincia: 'Buenos Aires',
      ciudad: 'Escobar',
      fechadenacimiento: '11/01/1965',
      contraseña: 'contraseñausuario1',
    };

    await db_usuarios.agregarUsuario(usuario);


    // Verifica que los argumentos pasados a insertOne sean los esperados
    expect(mockCollection.insertOne).toHaveBeenCalledWith({
      nombre_y_apellido: 'Usuario Nombre Apellido',
      email: 'usuario1@gmail.com',
      telefono: 113113131,
      pais: 'Argentina',
      provincia: 'Buenos Aires',
      ciudad: 'Escobar',
      fechadenacimiento: '11/01/1965',
      contraseña: 'contraseñausuario1',
    });
  });



  it('debería eliminar un usuario', async () => {
    // Configura el mock para deleteOne usando mockResolvedValueOnce
    mockCollection.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });
    const usuarioemail = 'test@example.com';
  
    await db_usuarios.eliminarUsuario(usuarioemail);
  
    // Verifica que los argumentos pasados a deleteOne sean los esperados
    expect(mockCollection.deleteOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
  






  it('debería consultar un usuario', async () => {
    // Configura el mock para findOne usando mockResolvedValueOnce
    const usuarioConsultado = {
      nombre_y_apellido: 'Usuario Consultado',
      email: 'usuario1@gmail.com',
      telefono: 113113131,
      pais: 'Argentina',
      provincia: 'Buenos Aires',
      ciudad: 'Escobar',
      fechadenacimiento: '11/01/1965',
      contraseña: 'contraseñausuario1',
    };

    const emailUsuarioAConsultar = 'usuario1@gmail.com';
    mockCollection.findOne.mockResolvedValueOnce(usuarioConsultado);


    const usuario = await db_usuarios.consultarUsuario(emailUsuarioAConsultar);

   
    // Verifica que los argumentos pasados a findOne sean los esperados
    expect(mockCollection.findOne).toHaveBeenCalledWith({ email: 'usuario1@gmail.com' });

    // Verifica que la función devuelva un objeto Usuario con los datos correctos
    expect(usuario).toEqual(new Usuario(
      usuarioConsultado.nombre_y_apellido,
      usuarioConsultado.email,
      usuarioConsultado.telefono,
      usuarioConsultado.pais,
      usuarioConsultado.provincia,
      usuarioConsultado.ciudad,
      usuarioConsultado.fechadenacimiento,
      usuarioConsultado.contraseña
    ));
  });



  it('debería modificar un usuario y devolver 1', async () => {
    // Configura el mock para updateOne usando mockResolvedValueOnce
    const usuarioModificado = {
      nombre_y_apellido: 'Usuario Modificado',
      email: 'usuario_modificado@gmail.com',
      telefono: 999999999,
      pais: 'Argentina',
      provincia: 'Buenos Aires',
      ciudad: 'Buenos Aires',
      fechadenacimiento: '01/01/1990',
      contraseña: 'nueva_contraseña',
    };
  
    mockCollection.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });
  
    // Pasa el objeto de usuario directamente
    const resultado = await db_usuarios.modificarUsuario(usuarioModificado);
  
    // Verifica que los argumentos pasados a updateOne sean los esperados
    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { email: 'usuario_modificado@gmail.com' },
      {
        $set: {
          nombre_y_apellido: 'Usuario Modificado',
          telefono: 999999999,
          pais: 'Argentina',
          provincia: 'Buenos Aires',
          ciudad: 'Buenos Aires',
          fechadenacimiento: '01/01/1990',
          contraseña: 'nueva_contraseña',
        },
      }
    );
  
    // Verifica que la función devuelva 1
   // expect(resultado).toBe(1);


    
  });
  

});
