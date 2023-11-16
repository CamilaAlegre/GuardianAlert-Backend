const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class AlgoTensor3 {
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


       //     this.activityToNumeric(values[5]),

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

  // Método para entrenar la red neuronal
 async trainNeuralNetwork(options, dataset,inputForPrediction) {

    const { iterations } = options;
  /*  const inputs =  tf.tensor(dataset.map(item => item.input));
    const outputs =  tf.tensor(dataset.map(item => item.output));

    await this.model.fit(inputs, outputs, {
      
      epochs: 200, 
      batchSize: 32,  
      error: 0.005,
      shuffle: true,
      verbose: 0,
      rate:0.1,
      validationSplit: 0.2,
   });*/

   const inputs =  tf.tensor(this.dataset.map(item => item.input));
   const outputs =  tf.tensor(this.dataset.map(item => item.output));

   await this.model.fit(inputs, outputs, {
    epochs: 200, 
     batchSize: 32,  
     error: 0.005,
     shuffle: true,
     verbose: 0,
     rate:0.1,
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
