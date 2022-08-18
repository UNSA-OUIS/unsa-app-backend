const { Sequelize } = require('sequelize');

const config = require('./../config/config');
const setupModels = require('./../db/models');

//Conexion para postgres

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log
});

//conexion para mysql
/*const USER = encodeURIComponent(config.dbUser2);
const PASSWORD = encodeURIComponent(config.dbPassword2);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost2}:${config.dbPort2}/${config.dbName2}`

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: console.log
});*/

setupModels(sequelize);

module.exports = sequelize;