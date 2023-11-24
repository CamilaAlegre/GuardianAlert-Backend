const TensorImpact = require('./tensorImpact');

const tensorImpact = new TensorImpact();

// Constantes
const THRESHOLD = 0.5;
const CSV_FILE_NAME = '../assets/completoimpactos.csv';
const DESIRED_KEYS = ["acc_max", "acc_kurtosis", "acc_skewness", "gyro_max", "gyro_kurtosis", "gyro_skewness", "linMaxValue", "postLinMaxValue", "postGyroMaxValue", "postMagMaxValue", "mag_max", "mag_curtosis", "mag_skewness"];

const transformData = (frontEndData) => {
    const transformedData = DESIRED_KEYS.map((key) => {
      const value = frontEndData[key] || 0;
      return parseFloat(value);
    });
  
    // Asegurarse de que hay exactamente 13 valores
    if (transformedData.length !== 13) {
      throw new Error('Se esperan 13 valores para la transformación de datos.');
    }
  
    return transformedData;
  };
  
  const detectImpacts = async (req, res) => {
    try {
      const datosTransformados = transformData(req.body);
  
      // Cargar el modelo
      await tensorImpact.loadCSVData(CSV_FILE_NAME);
  
      // Realizar la predicción
      const prediction = await tensorImpact.predict(datosTransformados);
  
      // Evaluar si es un impacto
      const isImpacto = prediction.arraySync()[0][0] >= THRESHOLD;
  
      console.log('Es impacto:', isImpacto);
  
      // Enviar respuesta al cliente
      res.status(200).json({
        input: datosTransformados,
        predictionImpact: isImpacto,
        result: 'Procesamiento exitoso',
      });
  
    } catch (error) {
      console.error('Error durante el procesamiento:', error);
      res.status(500).send('Error interno del servidor');
    }
  };
  

module.exports = {
  detectImpacts,
};
