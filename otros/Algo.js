const synaptic = require('synaptic');
const fs = require('fs');
const csv = require('csv-parser');

class NeuralNetwork {
  constructor() {
    // Crear una red neuronal y capas de entrada y salida (ajusta el número de neuronas según tus datos)
    const { Layer, Network, Trainer } = synaptic;
    this.inputLayer = new Layer(9); // 9 características de entrada
    this.outputLayer = new Layer(1); // Salida binaria (1 neurona)

    this.inputLayer.project(this.outputLayer); // Conectar capas de entrada y salida

    this.network = new Network({
      input: this.inputLayer,
      output: this.outputLayer,
    });

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

  // Método para cargar datos desde un archivo CSV
  loadCSVData(csvFilePath) {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Procesar los valores del CSV y almacenarlos en el array de dataset
        const inputData = [
          parseFloat(row.acc_max),
          parseFloat(row.gyro_max),
          parseFloat(row.acc_kurtosis),
          parseFloat(row.gyro_kurtosis),
          this.activityToNumeric(row.label),
          parseFloat(row.lin_max),
          parseFloat(row.acc_skewness),
          parseFloat(row.gyro_skewness),
          parseFloat(row.post_gyro_max),
          parseFloat(row.post_lin_max),
        ];

        const outputData = [parseInt(row.fall)]; // La columna 'fall' se utiliza como salida

        this.dataset.push({ input: inputData, output: outputData });
      })
      .on('end', () => {
        console.log('Datos cargados exitosamente.');
      });
  }

  // Método para entrenar la red neuronal
  trainNeuralNetwork(options) {
    const { Trainer } = synaptic;
    const trainer = new Trainer(this.network);

    trainer.train(this.dataset, options);

    console.log('Red neuronal entrenada.');
  }

  // Método para realizar predicciones
  predict(inputData) {
    const prediction = this.network.activate(inputData)[0];
    return prediction;
  }

  // Método para mapear las etiquetas de actividad a valores numéricos
  activityToNumeric(activityLabel) {
    return this.activityMap[activityLabel] || 0; // Valor predeterminado si no se encuentra la etiqueta
  }
}

// Ejemplo de uso:
const neuralNetwork = new NeuralNetwork();
neuralNetwork.loadCSVData('./Train.csv');

const trainingOptions = {
  rate: 0.1,
  iterations: 10000,
  error: 0.005,
};

neuralNetwork.trainNeuralNetwork(trainingOptions);




const datos = [
    { timestamp: 1, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 2, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 3, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 4, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 5, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    { timestamp: 6, acc_x: 0.5, acc_y: 0.2, acc_z: 0.9, gyro_x: 0.1, gyro_y: 0.3, gyro_z: 0.2 },
    // Más datos aquí
  ];




/*

const inputForPrediction = [
  26.039918537018742,
  7.309796699430188,
  20.378162104442573,
  2.7824758875712914,
  neuralNetwork.activityToNumeric('SDL'),
  11.131079696122551,
  3.8913614045630966,
  1.5929268156092316,
  7.086617599915782,
  10.790400250203442,
];*/




const Calculador = require('./Calculador');
const algoritmo = new Calculador();

async function obtenerCampos() {
  const campos = await algoritmo.calcularCaracteristicas(datos);
  console.log(campos);
  return campos;
}

async function main() {
  const campos = await obtenerCampos();
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
  const prediction = neuralNetwork.predict(inputForPrediction);
  console.log(`Predicción: ${prediction}`);
}

main();




