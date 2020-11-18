const express = require('express');
const routes = express.Router();

const crypto = require('crypto');

routes.get('/', (req, res) => {
    return res.render('chat/index.njk');
})

routes.post('/name', (req, res) => {
    const { name } = req.body;
    
    const hash = crypto.randomBytes(8).toString('hex');

    req.session.user = {
        name, 
        hash
    }

    return res.redirect('/');
})

module.exports = routes;