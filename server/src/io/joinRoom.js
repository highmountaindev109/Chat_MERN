const { Rooms, Chats } = require('../database/models');
const { findRoomUsers } = require('../utils');

const joinRoom = (io, socket) => async ({ room }) => {
    try {
        const { _id } = socket.decoded;
        // console.log(socket.rooms);
        // console.log('joining room:', room, _id);
        socket.join(room);
        // console.log(io)

        await Rooms.updateOne({ name: room }, { $addToSet: { users: [_id] } });

        const messages = await Chats.find({ room, type: 'public' });
        const usersInfo = await findRoomUsers(room);

        socket.emit('init room', {messages, onlineUsers: usersInfo, room});

        io.to(room).emit('joined room', {room, onlineUsers: usersInfo, userId: _id});
        console.log('joined room', room, usersInfo);
    } catch (err) {
        console.log(err);
    }
};

module.exports = joinRoom;
