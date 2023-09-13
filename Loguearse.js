class Loguearse {
    constructor(consultaUsuario) {
      this.consultaUsuario = consultaUsuario;
    }
  
    async iniciarSesion(email, contraseña) {
      const usuario = await this.consultaUsuario.consultarUsuario(email);
  
      if (usuario && usuario.contraseña === contraseña) {
        console.log('Inicio de sesión exitoso. Usuario encontrado:');
        console.log(usuario);
      } else {
        console.log('Inicio de sesión fallido.');
      }
    }
  }


const consultaUsuario = new DB_Usuarios();

const nuevoUsuario = new Usuario('Camila Anahi', 'Alegre', 'ejemplo@example.com', 'contraseña123', 'Argentina');
consultaUsuario.agregarUsuario(nuevoUsuario);

const login = new Login(consultaUsuario);
login.iniciarSesion('ejemplo@example.com', 'contraseña123');
