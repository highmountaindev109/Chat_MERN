const { Rooms, Chats } = require('../database/models');
const { findRoomUsers } = require('../utils');

const leaveRoom = (io, socket) => async ({ room }) => {
    try {
        const { _id } = socket.decoded;
        socket.leave(room);
        console.log('leave from', room)

        await Rooms.updateOne({ name: room }, { $pullAll: { users: [_id] } });
        const usersInfo = await findRoomUsers(room);
        io.to(room).emit('joined room', {room, onlineUsers: usersInfo});
    } catch (err) {
        console.log(err);
    }
};

module.exports = leaveRoom;
