const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


router.get('/renew', authController.protect, authController.renewToken);

router.post('/login/google', authController.googleSignIn);

router.post('/login', authController.login);

router.get('/user', authController.protect, authController.getUser);



module.exports = router;