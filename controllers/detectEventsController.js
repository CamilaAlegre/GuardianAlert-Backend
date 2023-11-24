const TensorFall = require('./tensorFall');
const TensorImpact = require('./tensorImpact');
const TensorHits = require('./tensorHits');

const tensorFall = new TensorFall();
const tensorImpact = new TensorImpact();
const tensorHits = new TensorHits();

const THRESHOLD = 0.5;

const transformFallData = (frontEndData) => {
  const DESIRED_KEYS = ["acc_max", "gyro_max", "acc_kurtosis", "gyro_kurtosis", "lin_max", "acc_skewness", "gyro_skewness", "post_gyro_max"];
  const transformedData = DESIRED_KEYS.map((key) => {
    const value = frontEndData[key] || 0;
    return parseFloat(value);
  });
  return transformedData;
};

const transformImpactData = (frontEndData) => {
  const DESIRED_KEYS = ["acc_max", "acc_kurtosis", "acc_skewness", "gyro_max", "gyro_kurtosis", "gyro_skewness", "linMaxValue", "postLinMaxValue", "postGyroMaxValue", "postMagMaxValue", "mag_max", "mag_curtosis", "mag_skewness"];
  const transformedData = DESIRED_KEYS.map((key) => {
    const value = frontEndData[key] || 0;
    return parseFloat(value);
  });

  if (transformedData.length !== 13) {
    throw new Error('Se esperan 13 valores para la transformación de datos de impacto.');
  }

  return transformedData;
};

const transformHitsData = (frontEndData) => {
  const DESIRED_KEYS = ["acc_max", "acc_kurtosis", "acc_skewness", "gyro_max", "gyro_kurtosis", "gyro_skewness", "linMaxValue", "postLinMaxValue", "postGyroMaxValue", "postMagMaxValue", "mag_max", "mag_curtosis", "mag_skewness"];
  const transformedData = DESIRED_KEYS.map((key) => {
    const value = frontEndData[key] || 0;
    return parseFloat(value);
  });

  if (transformedData.length !== 13) {
    throw new Error('Se esperan 13 valores para la transformación de datos de golpes.');
  }

  return transformedData;
};

const detectEvents = async (req, res) => {
  try {
    const fallData = transformFallData(req.body);
    const impactData = transformImpactData(req.body);
    const hitsData = transformHitsData(req.body);

    await tensorFall.loadCSVData('Train2.csv');
    await tensorImpact.loadCSVData('completoimpactos.csv');
    await tensorHits.loadCSVData('datasetgolpes.csv');

    const fallPrediction = await tensorFall.predict(fallData);
    const impactPrediction = await tensorImpact.predict(impactData);
    const hitsPrediction = await tensorHits.predict(hitsData);

    const isFall = fallPrediction.arraySync()[0][0] >= THRESHOLD;
    const isImpact = impactPrediction.arraySync()[0][0] >= THRESHOLD;
    const isHit = hitsPrediction.arraySync()[0][0] >= THRESHOLD;

    let event;

    if (isFall) {
      event = 'fall';
    } else if (isImpact) {
      event = 'impact';
    } else if (isHit) {
      event = 'hit';
    } else {
      event = 'no-event';
    }

    console.log('Evento detectado:', event);

    res.status(200).json({
      fallPrediction: isFall,
      impactPrediction: isImpact,
      hitsPrediction: isHit,
      event,
      result: 'Procesamiento exitoso',
    });

  } catch (error) {
    console.error('Error durante el procesamiento:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  detectEvents,
};
