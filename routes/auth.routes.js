const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleWare = require('../utils/authMiddleWare');
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar'), auth.register);

router.post('/login', auth.login);

router.post('/user', authMiddleWare, auth.getUser);

router.delete('/logout', authMiddleWare, auth.logout);




module.exports = router;