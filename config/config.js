//Agrega todas las variables en el process de node al correr
require('dotenv').config();

const config = {
    /*env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,*/
    "databases": {
        "mainDatabase": {
            "database": process.env.DB_NAME, //you should always save these values in environment variables
            "username": process.env.DB_USER,  //only for testing purposes you can also define the values here
            "password":  process.env.DB_PASSWORD,
            "host": process.env.DB_HOST,
            "port": process.env.DB_PORT,
            "dialect": "postgres"
        },
        "siacDatabase": {
            "database": process.env.DB_NAME2, 
            "username": process.env.DB_USER2,  
            "password":  process.env.DB_PASSWORD2,
            "host": process.env.DB_HOST2,
            "port": process.env.DB_PORT2,
            "dialect": "mysql"
        },
        "bancoDatabase": {
            "database": process.env.DB_NAME3, 
            "username": process.env.DB_USER3,  
            "password":  process.env.DB_PASSWORD3,
            "host": process.env.DB_HOST3,
            "port": process.env.DB_PORT3,
            "dialect": "mysql"
        },
    },
}

module.exports = config;