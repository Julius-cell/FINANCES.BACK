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

// TODO: Modificar el amnejo de errores (errorController) a las necesidades de la app
exports.googleSignIn = async (req, res, next) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const userDB = await User.findOne({email});
    console.log(name, email, picture);
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        photo: picture,
        google: true,
        password: '@@@@@@@@',
        passwordConfirm: '@@@@@@@@'
      })
    } else {
      user = userDB;
      user.google = true;
    }
    // Save in DB
    await user.save();
    // Generate JWT - TOKEN
    console.log(userDB);
    createSendToken(userDB, 200, req, res);
    
    // const data = {
    //   message: 'Google SignIn',
    //   user: {
    //     name,
    //     email,
    //     picture
    //   }
    // }
    // sendResponse(data, 200, req, res);
  } catch (error) {
    const data = {
      message: error.name,
      error: error.stack
    }
    sendResponse(data, 401, req, res);
  }
};