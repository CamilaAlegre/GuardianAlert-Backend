// tensorFall.js
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

class TensorFall {
  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 9, inputShape: [8], activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, outputShape: [1], activation: 'sigmoid' }));
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    this.dataset = [];
  }

  async loadCSVData(csvFileName) {
    try {
      const csvFilePath = path.join(__dirname, '..', 'assets', csvFileName);
      const rows = fs.readFileSync(csvFilePath, 'utf8').split('\n');
      const dataset = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (i !== 0 && i !== rows.length - 1) {
          const values = row.split(',');
          const inputData = [
            parseFloat(values[1]),  // acc_max
            parseFloat(values[2]),  // gyro_max
            parseFloat(values[3]),  // acc_kurtosis
            parseFloat(values[4]),  // gyro_kurtosis
            parseFloat(values[6]),  // lin_max
            parseFloat(values[7]),  // acc_skewness
            parseFloat(values[8]),  // gyro_skewness
            parseFloat(values[9]),  // post_gyro_max
            parseFloat(values[10]), // post_lin_max
          ];
          const outputData = [parseInt(values[11])];
          dataset.push({ input: inputData, output: outputData });
        }
      }

      console.log('Datos cargados exitosamente.');
      this.dataset = dataset;
    } catch (error) {
      console.error('Error al cargar datos:', error);
      throw error;
    }
  }

  async trainNeuralNetwork(options) {
    const { iterations, learningRate } = options;
    const inputs = tf.tensor(this.dataset.map(item => item.input));
    const outputs = tf.tensor(this.dataset.map(item => item.output));

    await this.model.fit(inputs, outputs, {
      epochs: iterations,
      batchSize: 32,
      shuffle: true,
      verbose: 0,
      learningRate,
    });

    console.log('Training completed.');
  }

  async predict(inputData) {
    const inputTensor = tf.tensor([inputData]);
    const prediction =  this.model.predict(inputTensor);
    console.log('Predicción completada.');

    inputTensor.dispose();

    return prediction;

  }

}

module.exports = TensorFall;
