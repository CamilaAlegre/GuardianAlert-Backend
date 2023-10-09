const DB_Usuarios = require("./DB_Usuarios");


class Loguearse {
    constructor(db_usuario) {
      this.db_usuario = db_usuario;
    }
  
    async iniciarSesion(email, contraseña) {
      const usuario = await this.db_usuario.consultarUsuario(email);
  
      if (usuario && usuario.contraseña === contraseña) {
        console.log('Inicio de sesión exitoso. Usuario encontrado:');

        console.log(usuario);
      } else {
        console.log('Inicio de sesión fallido.');
      }
    }
  }


  module.exports =  Loguearse;
