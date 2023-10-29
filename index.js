
const DB_Alertas = require('./DB_Alertas');
const DB_ContactosEmergencia = require('./DB_ContactosEmergencia');
const DB_Usuarios = require('./DB_Usuarios');
const Usuario = require('./Usuario');
const Registración = require('./Registración');
const Loguearse = require('./Loguearse');

// instancias
const db_alertas = new DB_Alertas();
const db_contactosEmergencia = new DB_ContactosEmergencia();
const db_usuarios = new DB_Usuarios();


// Ejemplo de registro de usuario
const registroUsuario = new Registración(db_usuarios);
registroUsuario.registrarUsuario(new Usuario(
  'Camila Anahi Alegre',
  'jjj@example.com',
  '11312212',
  'Argentina',
  'Bs.As',
  'Garin',
  '11/08/1995',
  '123456')
);

// Ejemplo de inicio de sesión
const login = new Loguearse(db_usuarios);
login.iniciarSesion('florenacua@gmail.com', '123456');







const modificarUsuario = new DB_Usuarios();

modificarUsuario.modificarUsuario(new Usuario(
  'Camila Anahi Alegre',
  'jjj@example.com',
  '11312212',
  'Peru',
  'Bs.As',
  'Garin',
  '11/08/1995',
  '123456'));


const emailUsuarioAEliminar = 'jjj@example.com'; 
db_usuarios.eliminarUsuario(emailUsuarioAEliminar);




///////////////////////////////////alertas

const nuevaAlerta = {
    nombreyapellidousuario: 'Camila Anahi Alegre',
    emailusuario: 'ejemplo@example.com',
    fecha: '2023-09-18',
    hora: '15:30:00',
    lugar: 'Ejemplo City',
    estadodelevento: 'Activo',
  };
  
  db_alertas.agregarHistorialEventos(nuevaAlerta);
  
  const emailUsuarioAConsultar = 'ejemplo@example.com'; 
  db_alertas.consultasdealertas(emailUsuarioAConsultar);









  


////////////////////////////////contactos de emergencia
const ContactoEmergencia = require('./ContactoEmergencia');
const consultaemergencia = new DB_ContactosEmergencia();

consultaemergencia.agregarContactoEmergencia(new ContactoEmergencia
  ('Claudia','acuaa@hotmail.com',
    'a','111','aaa','amigo') 
  );

 

const filtro = {usuarioemail : "acuaa@hotmail.com" };
eliminarContactosDeEmergencia(filtro)
  .catch(error => {
    console.error('Error al eliminar contactos de emergencia:', error);
  });