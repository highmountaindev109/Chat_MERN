const { Rooms } = require('../../database/models');
const createError = require('../createError');

const isNewRoom = async (name) => {
  const roomExist = await Rooms.findOne({ name });
  if (roomExist) {
    throw createError(
      400,
      'Bad Request',
      'this room already exist, please pick another name'
    );
  }
};

module.exports = isNewRoom;
