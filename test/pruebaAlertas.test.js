const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_Alertas = require('../DB_Alertas');
const Evento = require('../Evento');

jest.mock('mongodb');

describe('Pruebas para DB_Alertas', () => {
  let db_alertas;
  let mockCollection;

  beforeAll(() => {
    db_alertas = new DB_Alertas();

    mockCollection = {
      insertOne: jest.fn(),
      find: jest.fn(),
      toArray: jest.fn(),
    };

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
    jest.restoreAllMocks();
  });

  it('debería agregar historial de eventos', async () => {
    const nuevaAlerta = {
      nombreyapellidousuario: 'Camila Anahi Alegre',
      emailusuario: 'ejemplo@example.com',
      fecha: '2023-09-18',
      hora: '15:30:00',
      lugar: 'Buenos Aires, Garin',
      estado: 'Caida',
    };

    mockCollection.insertOne.mockResolvedValueOnce({ insertedId: '123' });

    const resultado=await db_alertas.agregarHistorialEventos(nuevaAlerta);

    expect(mockCollection.insertOne).toHaveBeenCalledWith({
      usuario: nuevaAlerta.nombreyapellidousuario,
      emailusuario: nuevaAlerta.emailusuario,
      fecha: nuevaAlerta.fecha,
      hora: nuevaAlerta.hora,
      lugar: nuevaAlerta.lugar,
      estado: nuevaAlerta.estado,
    });

    
    expect(resultado).toEqual('21');
    
  });

  it('debería consultar alertas', async () => {
    const emailUsuarioAConsultar = 'ejemplo@example.com';
    const alertasMock = [
      {
        usuario: 'Camila Anahi Alegre',
        emailusuario: 'ejemplo@example.com',
        fecha: '2023-09-18',
        hora: '15:30:00',
        lugar: 'Buenos Aires, Garin',
        estado: 'Activo',
      },
    ];
  
    mockCollection.find.mockReturnValueOnce({
      toArray: jest.fn().mockResolvedValueOnce(alertasMock),
    });
  
    const resultado = await db_alertas.consultasdealertas(emailUsuarioAConsultar);
  
    expect(mockCollection.find).toHaveBeenCalledWith({ emailusuario: emailUsuarioAConsultar });
    expect(resultado).toEqual([
      new Evento(alertasMock[0].usuario, alertasMock[0].emailusuario, alertasMock[0].fecha, alertasMock[0].hora, alertasMock[0].lugar, alertasMock[0].estado)
    ]);
  });
  
});
