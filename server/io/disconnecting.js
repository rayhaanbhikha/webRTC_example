const room = require('../db/room');
const events = require('./events');

const disconnecting = (namespace, socket) => () => {
    console.log("user-disconnected");
    if (socket.rooms && room.name in socket.rooms) {
        socket.leave(room.name);
        room.removeUser(socket.id);
        namespace.to(room.name).emit(events.leftRoom, room.info);
    }
}

module.exports = disconnecting;