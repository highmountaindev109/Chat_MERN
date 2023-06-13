const signup = require('./signup');
const login = require('./login');
const guestLogin = require('./guestLogin');
const googleLogin = require('./googleLogin');
const checkToken = require('./checkToken');
const logout = require('./logout');

module.exports = {
  signup,
  login,
  guestLogin,
  googleLogin,
  checkToken,
  logout,
};
