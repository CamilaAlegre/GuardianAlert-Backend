const { MongoClient, ServerApiVersion } = require('mongodb');

const user = "alegreanahi1995";
const password = "Zm7UfeOn9dfI3XXE";

const uri = `mongodb+srv://${user}:${password}@cluster0.scrh4hl.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "db_GuardianAlert";
const Evento = require ('./Evento');


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
  
        const documento = {
          usuario: alerta.nombreyapellidousuario,
          emailusuario:alerta.emailusuario,
          fecha: alerta.fecha,
          hora: alerta.hora,
          lugar: alerta.lugar,
          estado: alerta.estado,
        };
        const result = await collection.insertOne(documento);
        console.log(`Documento insertado con el ID: ${result.insertedId}`);
      } finally {
        await client.close();
      }
    }



    
    async consultasdealertas(emailusuario) {
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
    
        const alertas = await collection.find({ emailusuario: emailusuario }).toArray();
    
        const eventos = alertas.map(alerta => new Evento(
          alerta.usuario,
          alerta.emailusuario,
          alerta.fecha,
          alerta.hora,
          alerta.lugar,
          alerta.estado
        ));
    
        return eventos;
      } finally {
        await client.close();
      }
    }
    

  }

  

  module.exports =  DB_Alertas;




const db_alertas = new DB_Alertas();
/*
const nuevaAlerta = {
  nombreyapellidousuario: 'Camila Anahi Alegre',
  emailusuario: 'ejemplo@example.com',
  fecha: '2023-09-18',
  hora: '15:30:00',
  lugar: 'Ejemplo City',
  estadodelevento: 'Activo',
};

db_alertas.agregarHistorialEventos(nuevaAlerta);

const emailUsuarioAConsultar = 'ejemplo@example.com'; 
db_alertas.consultasdealertas(emailUsuarioAConsultar);*/
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