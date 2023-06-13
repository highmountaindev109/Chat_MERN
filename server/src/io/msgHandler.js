const { Chats } = require('../database/models');
const { findRoomUsers, findUserByName } = require('../utils');

const publicMessage = (io) => async ({ msg, room, from }) => {
  try {
    const date = Date.now();
    
    const newChat = await Chats.create({
      msg,
      type: 'public',
      from,
      room,
      date,
    });
    
    io.to(room).emit('room messages', [
      {
        type: 'public',
        room,
        _id: newChat._id,
        msg: newChat.msg,
        from: newChat.from,
        date: newChat.date,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

const privateMessage = (io, socket) => async ({ msg, room, from, to }) => {
  console.log('private')
  try {
    const date = Date.now();
    
    const newChat = await Chats.create({
      msg,
      type: 'private',
      from,
      to,
      room,
      date,
    });

    const toUser = await findUserByName(to);
    console.log('private', toUser._id)
    
    io.to(toUser._id).emit('room messages', [
      {
        type: 'private',
        room,
        _id: newChat._id,
        msg: newChat.msg,
        from: newChat.from,
        to: newChat.to,
        date: newChat.date,
      },
    ]);

    socket.emit('room messages', [
      {
        type: 'private',
        room,
        _id: newChat._id,
        msg: newChat.msg,
        from: newChat.from,
        to: newChat.to,
        date: newChat.date,
      }
    ])
    console.log(msg, room, from, newChat.msg)
  } catch (err) {
    console.log(err);
  }
};

module.exports = { publicMessage, privateMessage };
