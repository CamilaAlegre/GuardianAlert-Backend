class Evento {
  constructor(usuario, emailusuario,fecha, hora, lugar, estado) {
    this.usuario = usuario;
    this.emailusuario=emailusuario;
    this.fecha = fecha;
    this.hora = hora;
    this.lugar = lugar;
    this.estado = estado;
  }
}


module.exports =  Evento;
