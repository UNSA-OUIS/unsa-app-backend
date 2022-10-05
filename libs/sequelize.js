const { Sequelize } = require('sequelize');

const config = require('./../config/config');
const setupModels = require('./../db/models');

//Conexion para postgres principal

const USER1 = encodeURIComponent(config.databases['mainDatabase'].username);
const PASSWORD1 = encodeURIComponent(config.databases['mainDatabase'].password);
const URI1 = `${config.databases['mainDatabase'].dialect}://${USER1}:${PASSWORD1}@${config.databases['mainDatabase'].host}:${config.databases['mainDatabase'].port}/${config.databases['mainDatabase'].database}`

const mainDB = new Sequelize(URI1, {
    dialect: config.databases['mainDatabase'].dialect,
    logging: console.log
});
mainDB.dialect.supports.schemas = true;

//conexion para mysql siac
const USER2 = encodeURIComponent(config.databases['siacDatabase'].username);
const PASSWORD2 = encodeURIComponent(config.databases['siacDatabase'].password);
const URI2 = `${config.databases['siacDatabase'].dialect}://${USER2}:${PASSWORD2}@${config.databases['siacDatabase'].host}:${config.databases['siacDatabase'].port}/${config.databases['siacDatabase'].database}`

const siac = new Sequelize(URI2, {
    dialect: config.databases['siacDatabase'].dialect,
    logging: console.log
});
siac.dialect.supports.schemas = true;

//conexion para mysql banco_bcp
const USER3 = encodeURIComponent(config.databases['bancoDatabase'].username);
const PASSWORD3 = encodeURIComponent(config.databases['bancoDatabase'].password);
const URI3 = `${config.databases['bancoDatabase'].dialect}://${USER3}:${PASSWORD3}@${config.databases['bancoDatabase'].host}:${config.databases['bancoDatabase'].port}/${config.databases['bancoDatabase'].database}`

const banco = new Sequelize(URI3, {
    dialect: config.databases['bancoDatabase'].dialect,
    logging: console.log
});
banco.dialect.supports.schemas = true;

//conexion para mysql unsapay
const USER4 = encodeURIComponent(config.databases['unsapayDatabase'].username);
const PASSWORD4 = encodeURIComponent(config.databases['unsapayDatabase'].password);
const URI4 = `${config.databases['unsapayDatabase'].dialect}://${USER4}:${PASSWORD4}@${config.databases['unsapayDatabase'].host}:${config.databases['unsapayDatabase'].port}/${config.databases['unsapayDatabase'].database}`

const unsapay = new Sequelize(URI4, {
    dialect: config.databases['unsapayDatabase'].dialect,
    logging: console.log
});
unsapay.dialect.supports.schemas = true;

//conexion para postgres siscaja
const USER5 = encodeURIComponent(config.databases['siscajaDatabase'].username);
const PASSWORD5 = encodeURIComponent(config.databases['siscajaDatabase'].password);
const URI5 = `${config.databases['siscajaDatabase'].dialect}://${USER5}:${PASSWORD5}@${config.databases['siscajaDatabase'].host}:${config.databases['siscajaDatabase'].port}/${config.databases['siscajaDatabase'].database}`

const siscaja = new Sequelize(URI5, {
    dialect: config.databases['siscajaDatabase'].dialect,
    logging: console.log
});
siscaja.dialect.supports.schemas = true;

setupModels(mainDB, siac, banco, unsapay, siscaja);

module.exports = { mainDB, siac, banco, unsapay, siscaja };