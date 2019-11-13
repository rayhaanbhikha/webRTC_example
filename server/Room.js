class Room {
    constructor(name) {
        this.name = name;
        this.users = [];
    }

    get info() {
        return {
            room: this.name,
            users: this.users
        }
    }

    addUser(username, id) {
        this.users.push({
            username,
            id
        });
    }

    removeUser(id) {
        this.users = this.users.filter(user => user.id !== id);
    }
}

module.exports = Room;

