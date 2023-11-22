const tensorFall = require('./tensorFall');

const detectFalls = async (req, res) => {
  try {
    const datosCodificados = req.query.data;
    const datosJSON = decodeURIComponent(datosCodificados);
    const datos = JSON.parse(datosJSON);

    const tensor = new tensorFall();

    const trainingOptions = {
      rate: 0.1,
      iterations: 5000,
      error: 0.005,
    };

    // Load the data and train the model
    const prediction = await tensor.loadCSVData('../assets/Train2.csv', trainingOptions, datos);
    // Assuming prediction is a probability between 0 and 1
    const threshold = 0.5;
    const isCaida = prediction.dataSync()[0] >= threshold;

    // You can modify this response based on your requirements
    res.send({
      input: datos,
      prediction: isCaida,
    });

  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  detectFalls,
};
