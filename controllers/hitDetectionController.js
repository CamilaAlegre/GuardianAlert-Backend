const TensorHits = require('./tensorHits');
const tensorHits = new TensorHits();

// Constantes
const THRESHOLD = 0.5;
const CSV_FILE_NAME = 'datasetgolpes.csv'; // Update with your actual file name
const DESIRED_KEYS = ["acc_max", "acc_kurtosis", "acc_skewness", "gyro_max", "gyro_kurtosis", "gyro_skewness", "linMaxValue", "postLinMaxValue", "postGyroMaxValue", "postMagMaxValue", "mag_max", "mag_curtosis", "mag_skewness"];

const transformData = (frontEndData) => {
  const transformedData = DESIRED_KEYS.map((key) => {
    const value = frontEndData[key] || 0;
    return parseFloat(value);
  });

  if (transformedData.length !== 13) {
    throw new Error('Se esperan 13 valores para la transformación de datos.');
  }

  return transformedData;
};

const detectHits = async (req, res) => {
  try {
    const datosTransformados = transformData(req.body);

    await tensorHits.loadCSVData(CSV_FILE_NAME);
    const prediction = await tensorHits.predict(datosTransformados);

    const isGolpe = prediction.arraySync()[0][0] >= THRESHOLD;

    console.log('Es golpe:', isGolpe);

    res.status(200).json({
      input: datosTransformados,
      predictionGolpe: isGolpe,
      result: 'Procesamiento exitoso',
    });
  } catch (error) {
    console.error('Error durante el procesamiento:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  detectHits,
};
