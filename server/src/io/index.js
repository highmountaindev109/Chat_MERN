const joinRoom = require('./joinRoom');
const leaveRoom = require('./leaveRoom');
const { publicMessage, privateMessage } = require('./msgHandler');
const {sendSignal, returnSignal} = require('./videoHandler');
const socketDisconnect = require('./disconnect');

const ioHandler = (io) => (socket) => {
    socket.on('join room', joinRoom(io, socket));
    socket.on('leave room', leaveRoom(io, socket));

    // message events
    socket.on('public message', publicMessage(io));
    socket.on('private message', privateMessage(io, socket));

    // video events
    socket.on('sending video signal', sendSignal(io));
    socket.on('returning video signal', returnSignal(io));

    socket.on('error', (err) => {
      console.log(err);
    });

    socket.on('disconnecting', socketDisconnect(io, socket));
};

module.exports = ioHandler;
