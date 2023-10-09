const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://127.0.0.1:27017/GuardianAlert`)//cambiar por la direccion de mongo atlas
  .then(() => {
    console.log("Connection to MongoDB established successfull");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
