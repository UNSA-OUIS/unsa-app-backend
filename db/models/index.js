const { User, UserSchema } = require('./userModel');
const { Actmail, ActmailSchema } = require('./actmailModel');


function setupModels(mainDB, siac) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(mainDB));
    Actmail.init(ActmailSchema, Actmail.config(siac));

    //Se inicializan relaciones de los modelos
    User.associate(siac.models);
}

module.exports = setupModels;