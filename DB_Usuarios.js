const { MongoClient, ServerApiVersion } = require('mongodb');

const user = "alegreanahi1995";
const password = "Zm7UfeOn9dfI3XXE";
const uri = `mongodb+srv://${user}:${password}@cluster0.scrh4hl.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "db_GuardianAlert";

class DB_Usuario {

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

      // Agregar usuarios
      const collectionName = "Usuarios";
      const collection = db.collection(collectionName);

      // Documento que deseas agregar
      const documento = {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        fechadenacimiento: usuario.fechadenacimiento,
        email: usuario.email,
        nacionalidad: usuario.nacionalidad,
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

      const db = this.client.db(dbName);

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

      const db = this.client.db(dbName);

      const collectionName = "Usuarios";
      const collection = db.collection(collectionName);

      const usuario = await collection.findOne({ email });

      if (usuario) {
        console.log('Usuario encontrado:');
        console.log(usuario);
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
  
        // Colección de usuarios
        const collectionName = "Usuarios";
        const collection = db.collection(collectionName);
  
        // Criterio de búsqueda (en este caso, usaremos el campo "email" como identificador único)
        const filtro = { email: usuario.email };
  
        // Nuevos datos que deseas actualizar
        const nuevosDatos = {
          $set: {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            fechadenacimiento: usuario.fechadenacimiento,
            nacionalidad: usuario.nacionalidad,
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

/*
  async main() {
    try {
      await this.agregarUsuario();
    } catch (error) {
  console.error('Error en la función principal:', error);
    }
  }
}

// Crear una instancia de Consulta_Usuario y ejecutar la función principal
const consultaUsuario = new Consulta_Usuario();
consultaUsuario.main().catch(console.error);*/
