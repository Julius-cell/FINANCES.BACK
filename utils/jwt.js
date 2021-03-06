const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // USING COOKIES
  // res.cookie('jwt', token, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  // });

  // Remove password from output
  user.password = undefined;

  if (user.renew) {
    res.status(statusCode).json({
      status: 'success',
      token,
    });
  } else {
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  }

};


module.exports = {
  createSendToken
}