const { User, UserSchema } = require('./userModel');


function setupModels(sequelize) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(sequelize));

    //Se inicializan relaciones de los modelos
    //User.associate(sequelize.models);
}

module.exports = setupModels;