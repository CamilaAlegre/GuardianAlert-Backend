const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class EvaluacionAlgoTensorImpacto {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    this.model.add(tf.layers.dense({ units: 10, inputShape: [13], activation: 'relu' }));

    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    this.dataset = [];


  }

  async loadCSVData(csvFilePath) {
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

          const outputData = [parseInt(values[14])]; 

          dataset2.push({ input: inputData, output: outputData });

        }
      }

      console.log('Datos cargados exitosamente.');

     this.dataset = dataset2;


      
      await this.trainNeuralNetwork();
      
      const  evaluationResults=await this.evaluateModel();
      
   console.log('Resultados de la evaluación:', evaluationResults);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  async trainNeuralNetwork() {

    const inputs = tf.tensor(this.dataset.map(item => item.input));
    const outputs = tf.tensor(this.dataset.map(item => item.output));

     await this.model.fit(inputs, outputs, {
     epochs: 200, 
     batchSize: 64, 
     error: 0.005,
     shuffle: true,
     verbose: 0,
     rate:0.00001,
     validationSplit: 0.09,
  }).then(info => {
    console.log('Entrenamiento completado.');

    
  });
  
  }


  
   // Método para evaluar el modelo
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



module.exports = EvaluacionAlgoTensorImpacto;

function main() {
    const tensor = new EvaluacionAlgoTensorImpacto();
  
    const trainingOptions = {
      rate: 0.1,
      iterations: 5000,
      error: 0.005,
    };
  
  
  
  
  
    try {
     tensor.loadCSVData('./hoja.csv').then(prediction => {
    
    console.log('fin'); 
      
    });
    
    
    } catch (error) {
      console.error('Error durante la evaluación:', error);
    }
    //
  
  }
  main();
  