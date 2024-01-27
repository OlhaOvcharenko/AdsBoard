const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleWare = require('../utils/authMiddleWare');

router.post('/register', auth.register);

router.post('/login', auth.login);

router.post('/user', authMiddleWare, auth.getUser);




module.exports = router;