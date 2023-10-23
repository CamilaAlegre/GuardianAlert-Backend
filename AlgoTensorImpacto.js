const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class AlgoTensorImpacto {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    this.model.add(tf.layers.dense({ units: 10, inputShape: [14], activation: 'relu' }));

    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    this.dataset = [];

    this.activityMap = {
      'CA': 0,
      'TRO': 1,
      'SAL': 2,
      'SEN': 3,
      'CHP': 4,
      'CHO': 5,
    };
  }

  async loadCSVData(csvFilePath, options,input) {
    const dataset2 = []; 
    try {
      const rows = fs.readFileSync(csvFilePath, 'utf8').split('\n');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (i != 0 && i != rows.length - 1) {
          const values = row.split(',');

          const inputData = [
            parseFloat(values[1]), 
            parseFloat(values[2]), 
            parseFloat(values[3]),
            parseFloat(values[4]), 

            parseFloat(values[5]), 
            parseFloat(values[6]), 
            parseFloat(values[7]), 

            parseFloat(values[8]), 

            parseFloat(values[9]), 

            parseFloat(values[10]), 

            parseFloat(values[11]), 
            
            parseFloat(values[12]),     
            parseFloat(values[13]), 
            
            this.activityToNumeric(values[14]),

          ];

          const outputData = [parseInt(values[15])]; // La columna 'fall' se utiliza como salida

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
    const inputs = tf.tensor(dataset.map(item => item.input));
    const outputs = tf.tensor(dataset.map(item => item.output));

     await this.model.fit(inputs, outputs, {
      epochs: 1400,
      batchSize: 1400,
      shuffle: true,
      validationSplit: 0.1,
      verbose: 0, // Configura verbose en 0 para evitar la salida en pantalla
   }).then(info => {
    console.log('Entrenamiento completado.');

    
  const prediction = this.predict(inputForPrediction);
  return prediction;
  });
  
  }
  // Método para realizar predicciones
 async predict(inputData) {


    console.log(this.dataset);
    const inputTensor = tf.tensor([inputData]);
    const prediction = this.model.predict(inputTensor);

    inputTensor.dispose();

    return prediction;
  }

  // Método para mapear las etiquetas de actividad a valores numéricos
  activityToNumeric(activityLabel) {
    return this.activityMap[activityLabel] || 0;
  }
}



module.exports = AlgoTensorImpacto;

/*

const datos = [
    { timestamp: 1, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9 , mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
    { timestamp: 2, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9 , mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
    { timestamp: 3, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9 , mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
    { timestamp: 4, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9 , mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
    { timestamp: 5, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9, mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
    { timestamp: 6, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.5, gyro_z: 0.9 , mag_x: 0.1, mag_y: 0.5, mag_z: 0.9 },
   
  ];






function main() {
  // Ejemplo de uso:
  const neuralNetwork = new NeuralNetwork();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const Calculador2 = require('./Calculador2');
  const algoritmo = new Calculador2();

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
    campos[4],
    campos[5],
    campos[6],
    campos[7],
    campos[8],
    campos[9],
    campos[10],
    campos[11],
    campos[12],
    neuralNetwork.activityToNumeric('SDL'),
  ];
  
  

  


  const prediction=neuralNetwork.loadCSVData('./TrainImpact.csv', trainingOptions,inputForPrediction);
  console.log(`Predicción: ${JSON.stringify(prediction.dataSync()  )}`); 
}


main();
*/