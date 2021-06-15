const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


// router.post('/signin', authController.);

router.post('/login/google', authController.googleSignIn);

router.post('/login', authController.login);



module.exports = router;