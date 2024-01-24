const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller')

router.get('/ads', AdsController.getAll);

module.exports = router;