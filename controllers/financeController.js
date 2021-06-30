const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Finance = require('../models/financeModel');



exports.allFinances = catchAsync(async (req, res, next) => {
  const finances = await Finance.find();

  if (!finances) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: finances.length,
    data: {
      finances,
    },
  });
});