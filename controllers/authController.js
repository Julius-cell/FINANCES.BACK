const { googleVerify } = require('../utils/googleVerify');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { createSendToken } = require('../utils/jwt');

const sendResponse = (data, statusCode, req, res) => {
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
    const userDB = await User.findOne({email});
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
    createSendToken(userDB, 200, req, res);
  } catch (error) {
    const data = {
      message: error.name,
      error: error.stack
    }
    sendResponse(data, 401, req, res);
  }
};