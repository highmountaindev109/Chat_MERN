const { Rooms } = require('../database/models');
const { findRoomUsers } = require('../utils');

const socketDisconnect = (io, socket) => async () => {
    try {
        console.log('user disconnect');
        const rooms = Object.keys(socket.rooms);
        // socket.rooms returns an object where key and value are the same
        // first key is socket id, second key is rooms name
        const { _id } = socket.decoded;
        console.log(_id);
        console.log(Object.keys(socket.rooms))
        for (let index = 2; index < rooms.length; index++) {
            const room = rooms[index];
            if(room) {
                await Rooms.updateOne({ name: room }, { $pullAll: { users: [_id] } });
                const usersInfo = await findRoomUsers(room);
                io.to(room).emit('leave room', {room, onlineUsers: usersInfo, userId: _id});
            }
        }
        
    } catch (err) {
        console.log(err);
    }
};

module.exports = socketDisconnect;
