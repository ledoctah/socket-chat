const Room = require('../classes/Room');

const Socket = require('../models/Socket');
const Rooms = require('../models/Rooms');

module.exports = {
    index(req, res) {
        const formatted = [];

        const rooms = Rooms;
        const roomsHash = Object.keys(rooms);

        for(room of roomsHash) {
            formatted.push({
                name: rooms[room].name,
                hash: room,
                connectedUsers: Object.keys(rooms[room].connectedUsers)
            })
        }

        return res.render('rooms/index.njk', { rooms: formatted });
    },
    create(req, res) {
        const { name } = req.body;

        if(!name) return res.redirect('/rooms');

        const room = new Room(name);

        Rooms[room.hash] = room;

        return res.redirect(`/rooms/${room.hash}`);
    },
    join(req, res) {
        const { hash } = req.params;

        const room = Rooms[hash];

        if(!room) {
            return res.redirect('/rooms');
        }

        return res.render('chat/index.njk', { room });
    }
}