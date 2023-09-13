
class UsuarioController {
  async consultarUsuario(req, res) {
    try {
      const { id } = req.params; // Obtener el ID del usuario a consultar desde los parámetros de la URL
  
      // Lógica para consultar al usuario con el ID especificado utilizando la base de datos
      const usuario = await db.consultarUsuario(id);
  
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al consultar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  

  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = req.body;
      await db.agregarUsuario(nuevoUsuario);
      res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


  async modificarUsuario(req, res) {
    try {
      const { id } = req.params; // Obtener el ID del usuario a modificar desde los parámetros de la URL
      const nuevosDatos = req.body; // Obtener los nuevos datos del usuario desde el cuerpo de la solicitud
  
      // Lógica para modificar al usuario con el ID especificado utilizando la base de datos
      const resultado = await db.modificarUsuario(id, nuevosDatos);
  
      if (resultado) {
        res.status(200).json({ mensaje: 'Usuario modificado con éxito' });
      } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al modificar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  


}

module.exports = new UsuarioController();
