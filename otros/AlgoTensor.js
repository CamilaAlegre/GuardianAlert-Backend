const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class NeuralNetwork {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    // Agregar una capa de entrada con 10 unidades (ajusta según tus datos)
    this.model.add(tf.layers.dense({ units: 10, inputShape: [10], activation: 'relu' }));

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
  loadCSVData(csvFilePath, options,input) {
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


            this.activityToNumeric(values[5]),

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
      this.trainNeuralNetwork(options, this.dataset,input);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  // Método para entrenar la red neuronal
  trainNeuralNetwork(options, dataset,inputForPrediction) {

    const { iterations } = options;
    const inputs = tf.tensor(dataset.map(item => item.input));
    const outputs = tf.tensor(dataset.map(item => item.output));

     this.model.fit(inputs, outputs, {
      epochs: 1400,
      batchSize: 1400,
      shuffle: true,
      validationSplit: 0.1,
      verbose: 0, // Configura verbose en 0 para evitar la salida en pantalla
   }).then(info => {
    console.log('Entrenamiento completado.');

    
  const prediction = this.predict(inputForPrediction);
  console.log(`Predicción: ${JSON.stringify(prediction.dataSync()  )}`); 
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
  // Más datos aquí
];





function main() {
  // Ejemplo de uso:
  const neuralNetwork = new NeuralNetwork();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };

  const Calculador = require('../Calculador');
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
    neuralNetwork.activityToNumeric('SDL'),
    campos[4],
    campos[5],
    campos[6],
    campos[7],
    campos[8],
  ];
  
  


  neuralNetwork.loadCSVData('./Train.csv', trainingOptions,inputForPrediction);
}


main();
