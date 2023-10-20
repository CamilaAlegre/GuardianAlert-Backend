const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class AlgoTensor3 {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    // Agregar una capa de entrada con 10 unidades (ajusta según tus datos)
    this.model.add(tf.layers.dense({ units: 10, inputShape: [9], activation: 'relu' }));

    // Agregar una capa de salida con 1 unidad y función de activación sigmoide
    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    // Crear un array para almacenar los datos del CSV
    this.dataset = [];

    // Definir el mapeo de actividades
    this.activityMap = {
      'ETS': 0,
      'WAL': 1,
      'JOG': 2,
      'JUM': 3,
      'STU': 4,
      'STN': 5,
      'SCH': 6,
      'CSI': 7,
      'CSO': 8,
      'FOL': 9,
      'FKL': 10,
      'SDL': 11,
      'BSC': 12,
    };
  }

  // Define tu función loadCSVData
   async loadCSVData(csvFilePath, options,input) {
    const dataset2 = []; // Crea un array temporal para almacenar los datos

    try {
      // Lee y procesa el archivo CSV de manera síncrona
      const rows = fs.readFileSync(csvFilePath, 'utf8').split('\n');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (i != 0 && i != rows.length - 1) {
          const values = row.split(',');

          // Selecciona las columnas específicas que deseas cargar
          const inputData = [
            parseFloat(values[1]), // 'acc_max'
            parseFloat(values[2]), // 'gyro_max'
            parseFloat(values[3]), // 'acc_kurtosis'
            parseFloat(values[4]), // 'gyro_kurtosis'


       //     this.activityToNumeric(values[5]),

            parseFloat(values[6]), // 'gyro_kurtosis'
            parseFloat(values[7]), // 'gyro_kurtosis'

            parseFloat(values[8]), // 'gyro_kurtosis'

            parseFloat(values[9]), // 'gyro_kurtosis'

            parseFloat(values[10]), // 'gyro_kurtosis'


          ];

          const outputData = [parseInt(values[11])]; // La columna 'fall' se utiliza como salida

          dataset2.push({ input: inputData, output: outputData });

        }
      }

      console.log('Datos cargados exitosamente.');

      // Asigna el dataset al miembro this.dataset de la clase
      this.dataset = dataset2;


      // Llama a trainNeuralNetwork después de cargar los datos
     return await this.trainNeuralNetwork(options, this.dataset,input);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  // Método para entrenar la red neuronal
 async trainNeuralNetwork(options, dataset,inputForPrediction) {

    const { iterations } = options;
    const inputs =  tf.tensor(dataset.map(item => item.input));
    const outputs =  tf.tensor(dataset.map(item => item.output));

    await this.model.fit(inputs, outputs, {/*
      epochs: 1400,
      batchSize: 1400,
      shuffle: true,
      validationSplit: 0.1,
      verbose: 0, // Configura verbose en 0 para evitar la salida en pantalla*/
      epochs: 200,  // Ajusta el número de épocas según la convergencia.
      batchSize: 32,  // Utiliza un tamaño de lote moderado.
      error: 0.005,
      shuffle: true,
      verbose: 0,
      rate:0.1,
      validationSplit: 0.2,
   });
   
   console.log('Entrenamiento completado.');

    
  const prediction = await this.predict(inputForPrediction);
  return prediction;
  
  
  }
  // Método para realizar predicciones
 async predict(inputData) {


    const inputTensor = tf.tensor([inputData]);
    const prediction =  this.model.predict(inputTensor);
    console.log('Predicción completada.');

    inputTensor.dispose();

    return prediction;
  

  }

  // Método para mapear las etiquetas de actividad a valores numéricos
  activityToNumeric(activityLabel) {
    return this.activityMap[activityLabel] || 0;
  }
}








module.exports = AlgoTensor3;
/*
function main() {
  // Ejemplo de uso:
  const tensor = new AlgoTensor();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const Calculador = require('./Calculador');
  const algoritmo = new Calculador();

  function obtenerCampos() {
    const campos = algoritmo.calcularCaracteristicas(datos);

    return campos;
  }

  const campos = obtenerCampos();

  
  const inputForPrediction = [
    campos[0],
    campos[1],
    campos[2],
    campos[3],
    tensor.activityToNumeric('SDL'),
    campos[4],
    campos[5],
    campos[6],
    campos[7],
    campos[8],
  ];
  



  try {
    // Cargar los datos
   tensor.loadCSVData('./Train.csv', trainingOptions, inputForPrediction).then(prediction => {
  
  console.log(`Predicción: ${JSON.stringify(prediction.dataSync()  )}`); 
    
  });
  
  
  } catch (error) {
    console.error('Error durante la predicción:', error);
  }
  //

}
main();*/
