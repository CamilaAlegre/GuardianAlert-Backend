const { MongoClient, ServerApiVersion } = require('mongodb');

const user = "alegreanahi1995";
const password = "Zm7UfeOn9dfI3XXE";

const uri = `mongodb+srv://${user}:${password}@cluster0.scrh4hl.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "db_GuardianAlert";

class DB_Alertas {
    async agregarHistorialEventos(alerta) {
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
  
        const collectionName = "Alertas";
        const collection = db.collection(collectionName);
  
        // Documento que deseas agregar
       /* const documento = {
          usuario: 'Camila Anahi Alegre',
          fecha: '11/08/2023',
          hora: '12:30',
          lugar: 'Garin aaaaaaa',
          estadodelevento: 'Cayo',
        };*/
        const documento = {
          usuario: alerta.usuario,
          fecha: alerta.fecha,
          hora: alerta.hora,
          lugar: alerta.lugar,
          estadodelevento: alerta.estadodelevento,
        };
        const result = await collection.insertOne(documento);
        console.log(`Documento insertado con el ID: ${result.insertedId}`);
      } finally {
        await client.close();
      }
    }



    
    async consultasdealertas(usuario) {
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
    
        const collectionName = "Alertas";
        const collection = db.collection(collectionName);
    
        // Filtrar alertas por el campo "usuario"
        const alertas = await collection.find({ usuario: usuario }).toArray();
    
        return alertas;
      } finally {
        await client.close();
      }
    }
    


  }
  /*
  async function main() {
    try {
      const dbAlertas = new DB_Alertas();
      await dbAlertas.agregarHistorialEventos();
    } catch (error) {
      console.error('Error en la función principal:', error);
    }
  }
  
  main().catch(console.error);*/