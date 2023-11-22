const express = require('express');
const fallDetectionController = require('../controllers/fallDetectionController');
const router = express.Router();

router.get('/caidas', fallDetectionController.detectFalls);

module.exports = router;
