
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
