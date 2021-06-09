const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();


router.post('/login/google', authController.googleSignIn);


module.exports = router;
