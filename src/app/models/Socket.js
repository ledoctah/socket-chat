const session = require('../../config/session');
const Rooms = require('./Rooms');

module.exports = {
    configure(io) {
        io.use(function(socket, next) {
            session(socket.request, socket.request.res, next);
        });

        io.on('connection', client => {
            let roomHash = undefined;

            const user = client.request.session.user;
            
            client.on('join', (chatHash) => {
                console.log(`User '${user.name}' connected to room ${chatHash}`);
                
                Rooms[chatHash].connectedUsers[user.hash] = user;

                roomHash = chatHash;

                if(Rooms[chatHash]) {
                    client.join(chatHash);

                    const users = [];

                    Rooms[chatHash].connectedUsers;
                    
                    for(key of Object.keys(Rooms[chatHash].connectedUsers)) {
                        users.push({
                            hash: Rooms[chatHash].connectedUsers[key].hash,
                            name: Rooms[chatHash].connectedUsers[key].name
                        });
                    }

                    client.emit('connected', { status: 'connected', users: users, test: {teste1: 1, teste2:2}, me: user });

                    client.broadcast.to(chatHash).emit('newConnection', user);
                }
            });

            client.on('disconnect', () => {
                if(roomHash) {
                    delete Rooms[roomHash].connectedUsers[user.hash];

                    client.broadcast.to(roomHash).emit('disconnection', user);
                }
            });

            client.on('sendMessage', (message) => {
                if(roomHash) {
                    message = {
                        name: user.name,
                        text: message
                    };

                    client.broadcast.to(roomHash).emit('newMessage', message);
                }
            })

        });
    }
}