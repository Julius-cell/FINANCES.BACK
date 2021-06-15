const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();


router.get('/all', userController.allUsers);

router.post('/', userController.createUser);

router.patch('/update', authController.protect, userController.updateMe);


// router.get('/user/:id', userController);



module.exports = router;