
const Usuario = require('./Usuario');
class Registración {
    constructor(consultaUsuario) {
      this.consultaUsuario = consultaUsuario;
    }
  
    async registrarUsuario(nombre_y_apellido, email, telefono, pais,provincia,ciudad,fechadenacimiento,contraseña){
      try {
        const usuarioExistente = await this.consultaUsuario.consultarUsuario(email);
        if (usuarioExistente) {
          throw new Error('El usuario ya existe.');
        }
  
        const nuevoUsuario = new Usuario(nombre_y_apellido, email, telefono, pais,provincia,ciudad,fechadenacimiento,contraseña);
        
       
        await this.consultaUsuario.agregarUsuario(nuevoUsuario);
  
        console.log('Registro exitoso. Usuario creado:');
        console.log(nuevoUsuario);
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
      }
    }
  }
  

  module.exports =  Registración;

  
  const DB_Usuarios = require('./DB_Usuarios');
const db_usuario = new DB_Usuarios(); // Debe ser en minúscula

const registroUsuario = new Registración(db_usuario);

registroUsuario.registrarUsuario(
  'Camila Anahi Alegre',
  'jjj@example.com',
  '11312212',
  'Argentina',
  'Bs.As',
  'Garin',
  '11/08/1995',
  '123456'
);
