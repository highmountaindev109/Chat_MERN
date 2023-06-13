const createError = require('./createError');
const signToken = require('./user/signToken');
const validateSignUpData = require('./user/signupValidation');
const validateLoginCredentials = require('./user/loginValidation');
const validateIP = require('./ban/ipValidation');
const verifyGoogleToken = require('./user/verifyGoogleToken');
const verifyToken = require('./user/verifyToken');
const roomValidation = require('./room/roomValidation');
const findRoomUsers = require('./user/findRoomUsers');
const findUserByName = require('./user/findUserByName');
const isNewEmail = require('./user/isNewEmail');
const isNewUsername = require('./user/isNewUsername');
const createUser = require('./user/createUser');
const getUserByEmail = require('./user/getUserByEmail');
const checkPassword = require('./user/checkPassword');
const createToken = require('./user/createToken');
const validateRoomName = require('./room/roomValidation');
const isNewRoom = require('./room/isNewRoom');
const createRoom = require('./room/createRoom');
const getGuest = require('./user/getGuest');


module.exports = {
  createError,
  validateSignUpData,
  validateLoginCredentials,
  validateIP,
  signToken,
  verifyGoogleToken,
  verifyToken,
  roomValidation,
  findRoomUsers,
  findUserByName,
  isNewEmail,
  isNewUsername,
  createUser,
  getUserByEmail,
  checkPassword,
  createToken,
  validateRoomName,
  isNewRoom,
  createRoom,
  getGuest
};
