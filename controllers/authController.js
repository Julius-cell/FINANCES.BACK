const { googleVerify } = require('../utils/googleVerify');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { createSendToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const sendResponse = (data, statusCode, res) => {
  res.status(statusCode).json({
    status: 'success',
    data
  });
};

// GOOGLE SIGN IN
// TODO: Modificar el manejo de errores (errorController) a las necesidades de la app
exports.googleSignIn = async (req, res, next) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    // console.log(email);
    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        photo: picture,
        google: true,
        password: '@@@@@@@@',
        passwordConfirm: '@@@@@@@@',
      })
    } else {
      user = userDB;
      user.google = true;
      user.password = '@@@@@@@@';
      user.passwordConfirm = '@@@@@@@@';
    }
    // Save in DB
    await user.save();
    console.log('1', user);
    // Generate JWT - TOKEN
    createSendToken(userDB, 200, res);
  } catch (error) {
    const data = {
      message: error.name,
      error: error.stack
    }
    sendResponse(data, 401, res);
  }
};


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if the email and the password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exist && password is correct
  /*
  Because we defined select in the userModel as 'false', now that we need to see 
  the field password we have to use the .select() method and add a '+' before the name of the field
   */
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorret password or email', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Gettin token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Token Verification
  const decoded = jwt.verify(token, process.env.JWT_SECRET, ['complete']);
  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exist', 401)
    );
  }

  // 4) Check if user change passwoord after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

exports.renewToken = catchAsync(async (req, res, next) => {
  const user = req.user;
  user.renew = true;
  createSendToken(user, 200, res);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const userPopulated = await User.findById(user._id).populate('accounts');
  // createSendToken(user, 200, res);
  sendResponse(userPopulated, 200, res);
});