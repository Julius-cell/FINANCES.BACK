const express = require('express');
const financeController = require('../controllers/financeController');


const router = express.Router();

router.get('/all', financeController.allAccounts);

router.post('/:id', financeController.createAccount);

router.get('/account', financeController.getAccount);

router.post('/addIncome', financeController.addIncome);

router.post('/addExpense', financeController.addExpense);



module.exports = router;