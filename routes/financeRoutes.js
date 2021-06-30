const express = require('express');
const financeController = require('../controllers/financeController');


const router = express.Router();

router.get('/all', financeController.allFinances);



module.exports = router;