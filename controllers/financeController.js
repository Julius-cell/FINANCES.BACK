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

/**
 * Creates an account and save the id to create a reference for his user.
 * @param id - logged user Id
 * @body {} - object with incomes and expenses
 */
exports.createAccount = catchAsync(async (req, res, next) => {
  const accountData = req.body;
  const userId = req.params.id;
  const account = await Finance.create({
    incomes: accountData.incomes,
    expenses: accountData.expenses,
    creationDate: Date.now()
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
  const account = await Finance.findById(req.params.id);
  if (!account) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      account
    },
  });
});

exports.updateAccount = catchAsync(async (req, res, next) => {
  const accountData = req.body;
  const accountId = req.params.id;
  const account = await Finance.findByIdAndUpdate(accountId, {
      incomes: accountData.incomes,
      expenses: accountData.expenses,
      modificationDate: Date.now()
    },
    { new: true }
  );
  if (!account) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      account
    }
  });
});