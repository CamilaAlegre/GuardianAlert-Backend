const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');

class EvaluacionAlgoTensor3 {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    this.model.add(tf.layers.dense({ units: 10, inputShape: [9], activation: 'relu' }));

    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    this.dataset = [];

  
  }

   async loadCSVData(csvFilePath) {
    const dataset2 = []; 
    try {
      // Lee y procesa el archivo CSV de manera síncrona
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
      await this.trainNeuralNetwork();
      
      const  evaluationResults=await this.evaluateModel();
      
  // Imprimir las métricas de evaluación
  console.log('Resultados de la evaluación:', evaluationResults);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  // Método para entrenar la red neuronal
 async trainNeuralNetwork() {

    const inputs =  tf.tensor(this.dataset.map(item => item.input));
    const outputs =  tf.tensor(this.dataset.map(item => item.output));

    await this.model.fit(inputs, outputs, {
     epochs: 200, 
      batchSize: 32,  
      error: 0.005,
      shuffle: true,
      verbose: 0,
      rate:0.1,
      validationSplit: 0.2,
   });
   
   console.log('Entrenamiento completado.');
  
  
  }
  
   async evaluateModel() {
    const inputs = tf.tensor(this.dataset.map(item => item.input));
    const outputs = tf.tensor(this.dataset.map(item => item.output));

    const evaluation = await this.model.evaluate(inputs, outputs);

    const loss = evaluation[0].dataSync()[0];
    const accuracy = evaluation[1].dataSync()[0];

   return {
      loss,
      accuracy,
      // Otras métricas...
    };
  }


}








module.exports = EvaluacionAlgoTensor3;

function main() {
  const tensor = new EvaluacionAlgoTensor3();

  const trainingOptions = {
    rate: 0.1,
    iterations: 5000,
    error: 0.005,
  };





  try {
   tensor.loadCSVData('./Train2.csv').then(prediction => {
  
  console.log('fin'); 
    
  });
  
  
  } catch (error) {
    console.error('Error durante la evaluación:', error);
  }
  //

}
main();
