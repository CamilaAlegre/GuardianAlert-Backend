const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const csv = require('csvtojson');

// Definir una función para cargar y entrenar el modelo
async function trainModel() {
  const data = []; // Aquí almacenarás tus datos

  // Lee el archivo CSV y conviértelo en un formato adecuado
  await csv()
    .fromFile('./golpe.csv')
    .then((jsonObj) => {
      data.push(jsonObj);
      // Aquí puedes realizar cualquier preprocesamiento adicional necesario
    })
    .catch((err) => {
      console.error('Error al cargar el dataset:', err);
    });

  // Divide tus datos en características (X) y etiquetas (y)
  const X = tf.tensor2d(data.map(item => [parseFloat(item.ax), parseFloat(item.ay), parseFloat(item.az)]));
  const y = tf.tensor2d(data.map(item => [parseFloat(item.Bx), parseFloat(item.By), parseFloat(item.Bz)]));

  // Crea un modelo de regresión lineal
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 3, inputShape: [3] }));

  // Compila el modelo
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  // Entrena el modelo
  await model.fit(X, y, { epochs: 100 });
  console.log('El modelo ha sido entrenado.');

  // Ahora puedes evaluar el modelo

  // Genera un conjunto de prueba (puedes dividir tus datos en entrenamiento y prueba previamente)
  const X_test = tf.tensor2d([[0.15, 0.25, 0.35]]);
  const y_test = tf.tensor2d([[0.12, 0.22, 0.32]]);

  // Realiza una predicción en el conjunto de prueba
  const predictions = model.predict(X_test);
  console.log('Predicciones en el conjunto de prueba:', predictions.arraySync());

  // Calcula métricas de evaluación, como el MSE
  const mse = tf.metrics.meanSquaredError(y_test, predictions);
  console.log('Mean Squared Error (MSE):', mse.dataSync());
}

// Llama a la función para cargar y entrenar el modelo
trainModel();
