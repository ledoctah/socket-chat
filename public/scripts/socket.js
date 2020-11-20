let me = undefined;

const socket = io.connect('http://localhost:5000');

const pathname_split = location.pathname.split('/');
const hash = pathname_split[pathname_split.length-1];

socket.emit('join', hash);

socket.on('connected', object => {
    if(object.status == 'connected') {
        me = object.me;
        
        for(user of Object.keys(object.users)) {
            renderUser(object.users[user]);
        }
    }
});

socket.on('newConnection', user => {
    renderUser(user);
});

socket.on('disconnection', user => {
    removeUser(user);
});

const emitMessage = (message) => {
    socket.emit('sendMessage', message);
}

socket.on('newMessage', (message) => {
    renderMessage({ type: 'received', name: message.name, message: message.text });
})