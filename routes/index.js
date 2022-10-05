const express = require('express');
const usersRouter = require('./usersRouter');
const ticketRouter = require('./ticketRouter');
const canjeRouter = require('./canjeRouter');
const googleAuthRouter = require('./googleAuthRouter');

function routersApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/google', googleAuthRouter);
    router.use('/users', usersRouter);
    router.use('/tickets', ticketRouter);
    router.use('/canjes', canjeRouter);
}

module.exports = routersApi;