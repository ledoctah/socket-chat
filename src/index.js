const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');
const session = require('./config/session');

var app = express();

var server = require('http').Server(app);
var socket = require('socket.io')(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session);
app.use((req, res, next) => {
    res.locals.session = req.session;
    
    if(!req.session.user && req.url != '/name') {
        return res.render('initial/index.njk');
    }

    next();
});

app.use(routes);

app.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
    express: app,
    autoescape: false,
    noCache: true
});

const Socket = require('./app/models/Socket');
Socket.configure(socket);

server.listen((process.env.PORT || 5000), function() {
    console.log(`Server is running`);
})