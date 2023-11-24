const express = require('express');
const impactDetectionController = require('../controllers/impactDetectionController');
const router = express.Router();

// Ruta para manejar solicitudes POST con el JSON de datos
router.post('/impacto', (req, res) => {
  impactDetectionController.detectImpacts(req, res);
});

module.exports = router;
