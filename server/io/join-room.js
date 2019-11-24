const { getRoom } = require('../utils');
const room = require('../db/room');
const events = require('./events');

const joinRoom = (namespace, socket) => data => {

    const chatRoom1 = getRoom(room.name, namespace);

    console.log(data);
    const { username } = data;
    if (!chatRoom1() || chatRoom1().length < 2) {
        socket.join(room.name)
        socket.username = username;
        room.addUser(username, socket.id);
        socket.emit("you-joined", {
            currentUser: { username, id: socket.id },
            roomInfo: room.info
        })
        namespace.to(room.name).emit(events.joinedRoom, room.info);
    } else {
        socket.emit(events.roomFull);
    }
}

module.exports = joinRoom;