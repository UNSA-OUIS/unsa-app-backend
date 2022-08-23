const config = require('./../config/config');

const USER = encodeURIComponent(config.databases['mainDatabase'].username);
const PASSWORD = encodeURIComponent(config.databases['mainDatabase'].password);
const URI = `${config.databases['mainDatabase'].dialect}://${USER}:${PASSWORD}@${config.databases['mainDatabase'].host}:${config.databases['mainDatabase'].port}/${config.databases['mainDatabase'].database}`

module.exports = {
    development: {
        url: URI,
        dialect: config.databases['mainDatabase'].dialect
    },
    production: {
        url: URI,
        dialect: config.databases['mainDatabase'].dialect
    }
}