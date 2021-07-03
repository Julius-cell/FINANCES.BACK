const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Finance = require('../models/financeModel');
const User = require('../models/userModel');



exports.allAccounts = catchAsync(async (req, res, next) => {
  const accounts = await Finance.find();
  if (!accounts) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: accounts.length,
    data: {
      accounts,
    },
  });
});


exports.createAccount = catchAsync(async (req, res, next) => {
  const accountData = req.body;
  const userId = req.params.id;
  const account = await Finance.create({
    incomes: accountData.incomes,
    expenses: accountData.expenses,
  });
  const user = await User.findByIdAndUpdate(userId,
    { $push: { accounts: account._id}}, 
    { new: true }
  );

  if (!user) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }
  
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user,
    },
  });
});


exports.getAccount = catchAsync(async (req, res, next) => {
  // TODO: Get account by user logged
  // const account = await Finance.find();
  // if (!account) {
  //   return next(new AppError('An error occurred while trying to request the data', 500));
  // }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: 'Get Account not finished',
  });
});

exports.addIncome = catchAsync(async (req, res, next) => {
  // TODO: Add Income to the account of the user logged
  // const accounts = await Finance.find();
  // if (!accounts) {
  //   return next(new AppError('An error occurred while trying to request the data', 500));
  // }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: 'Add Income not finished',
  });
});

exports.addExpense = catchAsync(async (req, res, next) => {
  // TODO: Add expense to the account of the user logged
  // const accounts = await Finance.find();
  // if (!accounts) {
  //   return next(new AppError('An error occurred while trying to request the data', 500));
  // }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: 'Add Expense not finished',
  });
});