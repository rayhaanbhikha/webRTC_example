const getRoom = (room, namespace) => () => namespace.adapter.rooms[room];

module.exports = {
    getRoom
}