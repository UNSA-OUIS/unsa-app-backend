const express = require('express');
const usersRouter = require('./usersRouter');

function routersApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
}

module.exports = routersApi;