const { clientError, serverError } = require('./errorHandlers');
const { signup, login, guestLogin, googleLogin, checkToken, logout } = require('./users');
const { getRooms, addRoom } = require('./rooms');
const { getPrivateChat } = require('./chats');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
  guestLogin,
  googleLogin,
  checkToken,
  logout,
  getRooms,
  addRoom,
  getPrivateChat
};
