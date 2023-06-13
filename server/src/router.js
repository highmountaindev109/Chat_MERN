const express = require('express');

const {
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
} = require('./controllers');

const { withAuth } = require('./middleware');

const router = express.Router();

router.get('/checkToken', checkToken);
router.get('/logout', logout);
router.get('/rooms', getRooms);
router.post('/room', withAuth, addRoom);
router.post('/signup', signup);
router.post('/login', login);
router.post('/login/guest', guestLogin);
router.post('/login/google', googleLogin);

router.post('/messages/private', getPrivateChat);

router.use(clientError);
router.use(serverError);

module.exports = router;
