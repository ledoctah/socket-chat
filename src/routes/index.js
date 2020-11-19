const express = require('express');
const routes = express.Router();

const crypto = require('crypto');

routes.get('/', (req, res) => {
    return res.redirect('/rooms');
});

//INITIAL
routes.post('/name', (req, res) => {
    const { name } = req.body;
    
    const hash = crypto.randomBytes(8).toString('hex');

    req.session.user = {
        name, 
        hash
    }

    return res.redirect('/');
});

//ROOMS
const RoomController = require('../app/controllers/RoomController');
routes.get('/rooms', RoomController.index);
routes.get('/rooms/:hash', RoomController.join);
routes.post('/rooms', RoomController.create);

module.exports = routes;