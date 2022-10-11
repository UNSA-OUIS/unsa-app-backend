const express = require('express');
const usersRouter = require('./usersRouter');
const ticketRouter = require('./ticketRouter');
const googleAuthRouter = require('./googleAuthRouter');
const { verifyToken } = require('../middlewares/authentication');

function routersApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/google', googleAuthRouter);
    router.use('/users', verifyToken, usersRouter);
    router.use('/tickets', ticketRouter);
}

module.exports = routersApi;