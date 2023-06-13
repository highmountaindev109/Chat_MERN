const { findRoomUsers, findUserByName } = require('../utils');

const sendSignal = (io) => async ({ from, to, room, signal }) => {
    try {
        console.log(from, to)
        const toUser = await findUserByName(to);
        
        io.to(toUser._id).emit('video signal', {
            signal,
            from,
            room
        });
    } catch (err) {
      console.log(err);
    }
};

const returnSignal = (io) => async ({ from, to, room, signal }) => {
    try {
        console.log(from, to)
        const toUser = await findUserByName(to);
        
        io.to(toUser._id).emit('return video signal', {
            signal,
            to,
            from,
            room
        });
    } catch (err) {
      console.log(err);
    }
};

module.exports = {sendSignal, returnSignal};