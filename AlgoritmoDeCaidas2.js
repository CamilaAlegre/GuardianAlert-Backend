const tf = require('@tensorflow/tfjs-node'); // Importa TensorFlow para navegadores

class AlgoritmoDeCaidas2 {
  constructor(modelPath) {
    this.modelPath = modelPath;
    this.model = null; // El modelo se cargará cuando sea necesario
  }

  // Función para cargar el modelo
  async cargarModelo() {
    this.model = await tf.loadLayersModel(this.modelPath);
  }

  // Función para realizar predicciones
  async predecir(datos) {
    if (!this.model) {
      throw new Error('El modelo no ha sido cargado. Llama a cargarModelo() primero.');
    }

    // Preparar los datos de entrada (ajusta esto según tus necesidades)
    const inputData = tf.tensor2d([[28.05519859535977,
        10.794617323010852,
        21.334536447601472,
        34.16381128227045,
        'FOL',
        13.880577944682654,
        3.2834044377683167,
        4.577282542553694,
        10.755338641709578,
    
        13.762561204533556,
        1]]);

    // Realizar predicciones
    const predicciones = this.model.predict(inputData);

    // Retorna las predicciones (esto dependerá de tu problema)
    return predicciones;
  }
}

module.exports = AlgoritmoDeCaidas2;

// Comentario multilineal cerrado correctamente


const algoritmo = new AlgoritmoDeCaidas2('C:\\Users\\OEM\\Downloads\\archive\\Train.csv');
/*
algoritmo.cargarModelo().then(() => {
  // Preparar los datos de entrada (ajusta esto según tus datos)
  const nuevosDatos = [[28.05519859535977,
    10.794617323010852,
    21.334536447601472,
    34.16381128227045,
    'FOL',
    13.880577944682654,
    3.2834044377683167,
    4.577282542553694,
    10.755338641709578,
    13.762561204533556,
    1]];

  // Realizar predicciones
  algoritmo.predecir(nuevosDatos).then(predicciones => {
    // Imprimir las predicciones (esto dependerá de tu problema)
    predicciones.print();
  }).catch(error => {
    console.error('Error al hacer predicciones:', error);
  });
}).catch(error => {
  console.error('Error al cargar el modelo:', error);
});

*/