const express = require('express');
const fallDetectionController = require('../controllers/fallDetectionController');
const router = express.Router();

// Ruta para manejar solicitudes POST con el JSON de datos
router.post('/caidas', (req, res) => {
  fallDetectionController.detectFalls(req, res);
});

module.exports = router;
