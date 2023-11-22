const express = require('express');
const impactDetectionController = require('../controllers/impactDetectionController');

const router = express.Router();

router.get('/golpes', impactDetectionController.detectGolpes);

module.exports = router;
