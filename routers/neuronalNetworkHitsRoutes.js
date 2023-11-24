const express = require('express');
const hitsDetectionController = require('../controllers/hitDetectionController');
const router = express.Router();

router.post('/golpes', (req, res) => {
    hitsDetectionController.detectHits(req, res);
});

module.exports = router;
