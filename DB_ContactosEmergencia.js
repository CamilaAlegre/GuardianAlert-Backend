const { MongoClient, ServerApiVersion } = require('mongodb');

const user = "alegreanahi1995";
const password = "Zm7UfeOn9dfI3XXE";

const uri = `mongodb+srv://${user}:${password}@cluster0.scrh4hl.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "db_GuardianAlert";

class DB_ContactosEmergencia {

  async agregarContactoEmergencia(contactoEmergencia) {
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
      const collectionName = "ContactosEmergencia";
      const collection = db.collection(collectionName);

      const documento = {
        usuarionombreyapellido: contactoEmergencia.usuarionombreyapellido,
        usuarioemail: contactoEmergencia.usuarioemail,
        nombre: contactoEmergencia.nombre,
        telefono: contactoEmergencia.telefono,
        email: contactoEmergencia.email,
        relacion:contactoEmergencia.relacion
      };

      const result = await collection.insertOne(documento);
      console.log(`Contacto de Emergencia agregado con el ID: ${result.insertedId}`);


      return result.insertedId;
    } finally {

      await client.close();
    }
  }


  async consultaContactosdeEmergencia(usuarioemail) {
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
  
      const collectionName = "ContactosEmergencia";
      const collection = db.collection(collectionName);
  
      const Usuario_x_ContactoEmergencia = await collection.find({ usuarioemail: usuarioemail }).toArray();
     console.log(Usuario_x_ContactoEmergencia);
      return Usuario_x_ContactoEmergencia;
    } finally {
      await client.close();
    }
  }


async  eliminarContactosDeEmergencia(filtro) {
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
    const collectionName = "ContactosEmergencia";
    const collection = db.collection(collectionName);

    const deleteResult = await collection.deleteMany(filtro);

    console.log(`Se eliminaron ${deleteResult.deletedCount} contactos de emergencia.`);
    
    console.log('Eliminación finalizada');
    
    return deleteResult.deletedCount===1;
  } finally {
    await client.close();
  }
}
}

module.exports = DB_ContactosEmergencia;

/*
const ContactoEmergencia = require('./ContactoEmergencia');
const consultaemergencia = new DB_ContactosEmergencia();
const filtro = { usuarioemail: 'acuaa@hotmail.com' };
consultaemergencia.eliminarContactosDeEmergencia(filtro);
*/

/*
const ContactoEmergencia = require('./ContactoEmergencia');
const consultaemergencia = new DB_ContactosEmergencia();

consultaemergencia.agregarContactoEmergencia(new ContactoEmergencia
  ('Claudia','acuaa@hotmail.com',
    'a','111','aaa','amigo') 
  );*/

  

/* esto para agregar contactos de emergencia como se llamaria
async function main() {
  try {
    const dbContactosEmergencia = new DB_ContactosEmergencia();
    await dbContactosEmergencia.agregarContactosdeEmergencia();
  } catch (error) {
    console.error('Error en la función principal:', error);
  }
}

main().catch(console.error);
*/

//como se llamaria para eliminar contactos de emergencia
/*
const filtro = { nombre: "Juan" };
eliminarContactosDeEmergencia(filtro)
  .catch(error => {
    console.error('Error al eliminar contactos de emergencia:', error);
  });*/