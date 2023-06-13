const { verifyToken } = require('../../utils');
const { Users } = require('../../database/models');

const checkToken = async (req, res, next) => {
  try {
    console.log('check token', req.token)
    const { token } = req.cookies;
    const { _id } = await verifyToken(token);
    const { username, role, gender, avatar } = await Users.findOne({ _id });
    return res.json({ username, role, gender, avatar });
  } catch (err) {
    if (err.message === 'jwt must be provided') return res.send('un-auth');
    return next(err);
  }
};

module.exports = checkToken;
