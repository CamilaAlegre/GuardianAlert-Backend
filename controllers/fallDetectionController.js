const TensorFall = require('./tensorFall');

const tensorFall = new TensorFall();

// Constantes
const THRESHOLD = 0.5;
const CSV_FILE_NAME = 'Train2.csv';
const DESIRED_KEYS = ["acc_max", "gyro_max", "acc_kurtosis", "gyro_kurtosis", "lin_max", "acc_skewness", "gyro_skewness", "post_gyro_max"];

// Transformar datos del front-end al formato deseado
const transformData = (frontEndData) => {
  const transformedData = DESIRED_KEYS.map((key) => {
    const value = frontEndData[key] || 0; // Si la propiedad no existe, se asigna 0
    return parseFloat(value);
  });
  return transformedData;
};

const detectFalls = async (req, res) => {
  try {
    const datosTransformados = transformData(req.body);

    // Cargar el modelo
    await tensorFall.loadCSVData(CSV_FILE_NAME);

    // Realizar la predicción
    const prediction = await tensorFall.predict(datosTransformados);

    // Evaluar si es una caída
    const isCaida = prediction.arraySync()[0][0] >= THRESHOLD;

    console.log('Es caída:', isCaida);

    // Enviar respuesta al cliente
    res.status(200).json({
      input: datosTransformados,
      prediction: isCaida,
      result: 'Procesamiento exitoso',
    });

  } catch (error) {
    console.error('Error durante el procesamiento:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  detectFalls,
};
