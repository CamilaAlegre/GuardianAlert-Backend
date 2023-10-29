const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class NeuralNetwork {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    this.model.add(tf.layers.dense({ units: 9, inputShape: [9], activation: 'relu' }));

    this.model.add(tf.layers.dense({ units: 1, outputShape: 1,activation: 'sigmoid' }));

    this.model.add(tf.layers.dense({ units: 1,outputShape: 1, activation: 'linear' }));

    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    this.dataset = [];

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

  loadCSVData(csvFilePath, options,input) {
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



            parseFloat(values[6]), 
            parseFloat(values[7]), 

            parseFloat(values[8]), 

            parseFloat(values[9]), 

            parseFloat(values[10]), 


          ];

          const outputData = [parseInt(values[11])]; // La columna 'fall' se utiliza como salida

          outputData.push(this.activityToNumeric(values[5]));
          dataset2.push({ input: inputData, output: outputData });

        }
      }

      console.log('Datos cargados exitosamente.');

      // Asigna el dataset al miembro this.dataset de la clase
      this.dataset = dataset2;


      // Llama a trainNeuralNetwork después de cargar los datos
      this.trainNeuralNetwork(options, this.dataset,input);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  // Método para entrenar la red neuronal
  trainNeuralNetwork(options, dataset,inputForPrediction) {

    const { iterations } = options;
    const inputs = tf.tensor(dataset.map(item => item.input));
    const outputData1 = tf.tensor(dataset.map(item => [item.output[0]])); // Primera salida
    const outputData2 = tf.tensor(dataset.map(item => [item.output[1]])); // Segunda salida
    
    // Entrena la red neuronal con datos de salida 1
    this.model.fit(inputs, outputData1, {
    epochs: 1400,
    batchSize: 1400,
    shuffle: true,
    validationSplit: 0.1,
    verbose: 0,
    }).then(info => {
    console.log('Entrenamiento completado para la primera salida.');
    // Realiza la predicción para la primera salida
    const prediction1 = this.predict(inputForPrediction);
    console.log(`Predicción para la primera salida: ${JSON.stringify(prediction1.dataSync())}`);
    
    // Entrena la red neuronal con datos de salida 2
    this.model.fit(inputs, outputData2, {
    epochs: 1400,
    batchSize: 1400,
    shuffle: true,
    validationSplit: 0.1,
    verbose: 0,
    }).then(info => {
    console.log('Entrenamiento completado para la segunda salida.');
    // Realiza la predicción para la segunda salida
    const prediction2 = this.predict(inputForPrediction);
    console.log(`Predicción para la segunda salida: ${JSON.stringify(prediction2.dataSync())}`);
    });
    });
  }
  // Método para realizar predicciones
  predict(inputData) {


    console.log(this.dataset);
    const inputTensor = tf.tensor([inputData]);
    const prediction = this.model.predict(inputTensor);

    inputTensor.dispose();

    console.log(prediction);
    return prediction;
  }

  // Método para mapear las etiquetas de actividad a valores numéricos
  activityToNumeric(activityLabel) {
    return this.activityMap[activityLabel] || 0;
  }
}






const datos = [
  { timestamp: 1, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
  { timestamp: 2, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
  { timestamp: 3, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
  { timestamp: 4, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
  { timestamp: 5, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
  { timestamp: 6, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
 
];





function main() {
  const neuralNetwork = new NeuralNetwork();

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
    26.039918537018742,
    7.309796699430188,
    20.378162104442573,
    2.7824758875712914,
    11.131079696122551,
    3.8913614045630966,
    1.5929268156092316,
    7.086617599915782,
    10.790400250203442,
  ];
  
  


  neuralNetwork.loadCSVData('./Train.csv', trainingOptions,inputForPrediction);
}


main();
