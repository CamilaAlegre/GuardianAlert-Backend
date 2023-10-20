const tf = require('@tensorflow/tfjs-node');
const { Console } = require('console');
const fs = require('fs');
//const csvParserSync = require('csv-parser');

class EvaluacionAlgoTensor3 {
  constructor() {
    // Crear el modelo secuencial de TensorFlow.js
    this.model = tf.sequential();

    // Agregar una capa de entrada con 10 unidades (ajusta según tus datos)
    this.model.add(tf.layers.dense({ units: 10, inputShape: [9], activation: 'relu' }));

    // Agregar una capa de salida con 1 unidad y función de activación sigmoide
    this.model.add(tf.layers.dense({ units: 1, outputShape: [1],activation: 'sigmoid' }));

    // Compilar el modelo
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    // Crear un array para almacenar los datos del CSV
    this.dataset = [];

  
  }

  // Define tu función loadCSVData
   async loadCSVData(csvFilePath) {
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


       //     this.activityToNumeric(values[5]),

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

    await this.model.fit(inputs, outputs, {/*
      epochs: 1400,
      batchSize: 1400,
      shuffle: true,
      validationSplit: 0.1,
      verbose: 0, // Configura verbose en 0 para evitar la salida en pantalla*/
      epochs: 200,  // Ajusta el número de épocas según la convergencia.
      batchSize: 32,  // Utiliza un tamaño de lote moderado.
      error: 0.005,
      shuffle: true,
      verbose: 0,
      rate:0.1,
      validationSplit: 0.2,
   });
   
   console.log('Entrenamiento completado.');
  
  
  }
  
   // Método para evaluar el modelo
   async evaluateModel() {
    // Convierte los datos de prueba en tensores
    const inputs = tf.tensor(this.dataset.map(item => item.input));
    const outputs = tf.tensor(this.dataset.map(item => item.output));

    // Usa el método evaluate del modelo para obtener las métricas
    const evaluation = await this.model.evaluate(inputs, outputs);

    // Puedes acceder a métricas específicas, por ejemplo, la pérdida y la precisión
    const loss = evaluation[0].dataSync()[0];
    const accuracy = evaluation[1].dataSync()[0];

    // Otras métricas pueden estar disponibles según cómo compilaste el modelo

    return {
      loss,
      accuracy,
      // Otras métricas...
    };
  }


}








module.exports = EvaluacionAlgoTensor3;

function main() {
  // Ejemplo de uso:
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