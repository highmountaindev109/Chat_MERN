const { Rooms, Users } = require('../../database/models');

const findRoomUsers = async (room) => {
  const roomInfo = await Rooms.findOne({ name: room });
  const roomUsers = await Users.find({ _id: { $in: roomInfo? roomInfo.users: []  } });
  // console.log(roomUsers);
  const usersInfo = roomUsers.map(({ _id, username, gender, avatar }) => ({_id, username, gender, avatar }));
  return usersInfo;
};

module.exports = findRoomUsers;
