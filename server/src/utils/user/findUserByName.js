const { Users } = require('../../database/models');

const findUserByName = async (username) => {
  const user = await Users.findOne({ username });
  // console.log(roomUsers);
  return user;
};

module.exports = findUserByName;
