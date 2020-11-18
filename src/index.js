const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

var app = express();

var server = require('http').Server(app);
var socket = require('socket.io')(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
    express: app,
    autoescape: false,
    noCache: true
});

const Socket = require('./app/models/Socket');
Socket.configure(socket);

server.listen(5000, function() {
    console.log(`Server is running`);
})