class Registración {
    constructor(consultaUsuario) {
      this.consultaUsuario = consultaUsuario;
    }
  
    async registrarUsuario(nombres, apellidos, email, contraseña, nacionalidad) {
      try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await this.consultaUsuario.consultaUsuario(email);
        if (usuarioExistente) {
          throw new Error('El usuario ya existe.');
        }
  
        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario(nombres, apellidos, email, contraseña, nacionalidad);
        
        // Agregar el nuevo usuario a la base de datos
        await this.consultaUsuario.agregarUsuario(nuevoUsuario);
  
        console.log('Registro exitoso. Usuario creado:');
        console.log(nuevoUsuario);
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
      }
    }
  }
  
  // Ejemplo de uso
  const consultaUsuario = new DB_Usuarios();
  const registroUsuario = new Registración(consultaUsuario);
  
  // Registrar un nuevo usuario
  registroUsuario.registrarUsuario(
    'Camila Anahi',
    'Alegre',
    'ejemplo@example.com',
    'contraseña123',
    'Argentina'
  );
  