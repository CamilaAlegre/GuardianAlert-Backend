class Usuario {
    constructor(nombre_y_apellido, email, telefono, pais,provincia,ciudad,fechadenacimiento,contraseña) {
      this.nombre_y_apellido = nombre_y_apellido;
      this.email = email;
      this.telefono=telefono;
      this.pais=pais;
      this.provincia=provincia;
      this.ciudad=ciudad;
      this.fechadenacimiento=fechadenacimiento;
      this.contraseña = contraseña;

    }
 
  }

  module.exports =  Usuario;

  