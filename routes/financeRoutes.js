const express = require('express');
const financeController = require('../controllers/financeController');


const router = express.Router();

router.get('/all', financeController.allAccounts);

router.post('/:id', financeController.createAccount);

router.get('/account/:id', financeController.getAccount);

router.patch('/account/:id', financeController.updateAccount);



module.exports = router;