const { MongoClient, ServerApiVersion, Db } = require('mongodb');
//const { consultarUsuario } = require('./ControladorUsuario');
const Usuario = require ('./Usuario');

const user = "alegreanahi1995";
const password = "Zm7UfeOn9dfI3XXE";
const uri = `mongodb+srv://${user}:${password}@cluster0.scrh4hl.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "db_GuardianAlert";

class DB_Usuarios {

  async agregarUsuario(usuario) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      await client.connect();
      console.log('Conexión exitosa a MongoDB');
      const db = client.db(dbName);

      const collectionName = "Usuarios";
      const collection = db.collection(collectionName);

      const documento = {
        nombre_y_apellido : usuario.nombre_y_apellido,
        email : usuario.email,
        telefono:usuario.telefono,
        pais:usuario.pais,
        provincia:usuario.provincia,
        ciudad:usuario.ciudad,
        fechadenacimiento: usuario.fechadenacimiento,
        contraseña : usuario.contraseña,
      };

      const result = await collection.insertOne(documento);
      console.log(`Documento insertado con el ID: ${result.insertedId}`);

    } finally {
      await client.close();
    }
  }





  async eliminarUsuario(email) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
      await client.connect();

      const db = client.db(dbName);

      const collectionName = "Usuarios";
      const collection = db.collection(collectionName);

      const result = await collection.deleteOne({ email });

      if (result.deletedCount === 1) {
        console.log(`Usuario con email ${email} eliminado.`);
      } else {
        console.log(`Usuario con email ${email} no encontrado.`);
      }
    } finally {
      await client.close();
    }
  }

  async consultarUsuario(email) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
      await client.connect();

      const db = client.db(dbName);

      const collectionName = "Usuarios";
      const collection = db.collection(collectionName);

      const usuario = await collection.findOne({ email });

      if (usuario) {
        console.log('Usuario encontrado:');
        console.log(usuario);



        return new Usuario(
          usuario.nombre_y_apellido,
          usuario.email,
          usuario.telefono,
          usuario.pais,
          usuario.provincia,
          usuario.ciudad,
          usuario.fechadenacimiento,
          usuario.contraseña );
  

      } else {
        console.log(`Usuario con email ${email} no encontrado.`);
      }
    } finally {
     await client.close();
    }
  }



  
    async modificarUsuario(usuario) {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
  
      try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB');
        const db = client.db(dbName);
  
        const collectionName = "Usuarios";
        const collection = db.collection(collectionName);
  
        const filtro = { email: usuario.email };
  
        const nuevosDatos = {
          $set: {
            nombre_y_apellido : usuario.nombre_y_apellido,
            telefono:usuario.telefono,
            pais:usuario.pais,
            provincia:usuario.provincia,
            ciudad:usuario.ciudad,
            fechadenacimiento:usuario.fechadenacimiento,
            contraseña: usuario.contraseña,
          },
        };
  
        const result = await collection.updateOne(filtro, nuevosDatos);
  
        if (result.modifiedCount === 1) {
          console.log(`Usuario modificado con éxito`);
        } else {
          console.log(`No se encontró el usuario o no se realizó ninguna modificación`);
        }
      } finally {
        await client.close();
      }
    }
  
  


}


module.exports =  DB_Usuarios;

/*
const db_usuarios = new DB_Usuarios();

const emailUsuarioAEliminar = 'ejemplo@example.com'; 
db_usuarios.eliminarUsuario(emailUsuarioAEliminar);*/
/*

const consultaUsuario = new DB_Usuarios();

consultaUsuario.modificarUsuario(new Usuario(
  'Camila Anahi Alegre',
  'ejemplo@example.com',
  '11312212',
  'Peru',
  'Bs.As',
  'Garin',
  '11/08/1995',
  '123456'));
/*

  async main() {
    try {
      await this.agregarUsuario();
    } catch (error) {
  console.error('Error en la función principal:', error);
    }
  }

*/
// Crear una instancia de Consulta_Usuario y ejecutar la función principal

//consultaUsuario.main().catch(console.error);
/*
const consultaUsuario = new DB_Usuarios();
const db_usuarios = require('./DB_Usuarios'); 

consultaUsuario.agregarUsuario(new Usuario(
    'Camila Anahi Alegre',
    'ejemplo@example.com',
    '11312212',
    'Argentina',
    'Bs.As',
    'Garin',
    '11/08/1995',
    '123456')
  );*/
  
