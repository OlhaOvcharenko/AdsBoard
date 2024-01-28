const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleWare = require('../utils/authMiddleWare');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);
router.post('/ads', authMiddleWare, imageUpload.single('photo'), AdsController.postNewAd);
router.put('/ads/:id', authMiddleWare, AdsController.editAd);
router.delete('/ads/:id', AdsController.deleteAd);

module.exports = router;