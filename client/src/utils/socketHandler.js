import io from 'socket.io-client';

const socket = io({
    autoConnect: true,
});


// const socketOn = {

//     // when other user joined to room
//     joinedRoom: (callback) => {
//         socket.on('joined room', payload => {
//             callback(payload);
//         })
//     },
//     roomMessages: (callback) => {
//         socket.on('room messages', (payload) => {
//             callback(payload);
//         })
//     }
// }

// const socketEmit = {
//     joinRoom: (room, callback) => {
//         socket.emit('join room', {room}, err => callback(err));
//     },
//     clientMessage: (message, room, username, date, callback) => {
//         socket.emit('client message', { message, room, username, date}, err => callback(err));
//     }
// }

// const socketClose = () => {
//     socket.removeAllListeners();
//     socket.close();
// }

const getSocket = () => {
    return socket;
}

export { getSocket };