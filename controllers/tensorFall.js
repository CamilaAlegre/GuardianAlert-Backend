const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');

class TensorFall {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 9, inputShape: [9], activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));
    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    this.dataset = [];
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
            parseFloat(values[6]), 
            parseFloat(values[7]), 
            parseFloat(values[8]), 
            parseFloat(values[9]), 
            parseFloat(values[10]), 
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

// Dentro de la clase TensorFall
async trainNeuralNetwork(options, dataset, inputForPrediction) {
  const { iterations, learningRate } = options;  // Cambiado de rate a learningRate
  const inputs = tf.tensor(dataset.map(item => item.input));
  const outputs = tf.tensor(dataset.map(item => item.output));

  await this.model.fit(inputs, outputs, {
    epochs: 200,
    batchSize: 32,
    error: 0.005,
    shuffle: true,
    verbose: 0,
    learningRate: 0.1,
  });

  console.log('Training completed.');
  const prediction = await this.predict(inputForPrediction);
  return prediction;
  }

// Dentro de la clase TensorFall, en el método predict
async predict(inputData) {
  const inputTensor = tf.tensor1d(inputData);  // Cambiado de tf.tensor a tf.tensor1d
  const prediction = this.model.predict(inputTensor);
  console.log('Prediction completed.');
  inputTensor.dispose();
  return prediction;
}
}


module.exports = TensorFall;
