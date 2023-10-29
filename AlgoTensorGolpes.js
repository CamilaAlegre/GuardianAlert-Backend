const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class AlgoTensorGolpes {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    this.model.add(tf.layers.dense({ units: 10, inputShape: [13], activation: 'relu' }));

    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

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
    
              const outputData = [parseInt(values[14])]; // La columna 'fall' se utiliza como salida
    

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

 
}



module.exports = AlgoTensorGolpes;