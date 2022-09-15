const express = require('express');
const usersRouter = require('./usersRouter');
const ticketRouter = require('./ticketRouter');
const googleAuthRouter = require('./googleAuthRouter');

function routersApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/google', googleAuthRouter);
    router.use('/users', usersRouter);
    router.use('/tickets', ticketRouter);
}

module.exports = routersApi;