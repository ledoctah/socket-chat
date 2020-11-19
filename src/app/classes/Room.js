const crypto = require('crypto');

class Room {
    connectedUsers = [];

    constructor(name) {
        this.hash = crypto.randomBytes(12).toString('hex');
        this.name = name;
        this.connectedUsers = [];
    }

    join(user) {
        this.connectedUsers.push(user);
    }

    disconnect(user) {
        this.connectedUsers.filter(item => item.hash != user.hash);
    }

}

module.exports = Room;