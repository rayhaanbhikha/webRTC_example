const { getRoom } = require('../utils');
const room = require('../db/room');
const events = require('./events');

const joinRoom = (namespace, socket) => data => {

    if (!data.username) {
        socket.emit(events.joinRoomError, "no username provided");
        return;
    }
    const chatRoom1 = getRoom(room.name, namespace);

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
        socket.emit(events.joinRoomError, "room is full"); //TODO: potentially get rid of this clause.
    }
}

module.exports = joinRoom;