const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

class TensorImpact {
  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 13, inputShape: [13], activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, outputShape: [1], activation: 'sigmoid' }));
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    this.dataset = [];
  }

  async loadCSVData(csvFileName) {
    try {
      const csvFilePath = path.join(__dirname, '..', 'assets', csvFileName);

      if (!fs.existsSync(csvFilePath)) {
        throw new Error(`El archivo ${csvFilePath} no existe.`);
      }

      const rows = fs.readFileSync(csvFilePath, 'utf8').split('\n');
      const dataset = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (i !== 0 && i !== rows.length - 1) {
          const values = row.split(',');

          const inputData = [
            parseFloat(values[0]),
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
          ];

          const outputData = [parseInt(values[14])];
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

    const inputs = this.normalizeData(this.dataset.map(item => item.input));
    const outputs = tf.tensor(this.dataset.map(item => item.output));

    await this.model.fit(inputs, outputs, {
      epochs: iterations,
      batchSize: 16,
      shuffle: true,
      verbose: 0,
      learningRate,
    });

    console.log('Entrenamiento completado.');
  }

  async predict(inputData) {
    const inputTensor = tf.tensor([inputData]);
    const prediction = this.model.predict(inputTensor);
    inputTensor.dispose();

    return prediction;
  }

  normalizeData(data) {
    const tensorData = tf.tensor2d(data);
    const mean = tensorData.mean(0);
    const std = tensorData.sub(mean).square().mean(0).sqrt();
    const normalizedData = tensorData.sub(mean).div(std);
    return normalizedData;
  }
}

module.exports = TensorImpact;
