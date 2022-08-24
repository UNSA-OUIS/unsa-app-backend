const { User, UserSchema } = require('./userModel');
const { Actmail, ActmailSchema } = require('./actmailModel');
const { Banco, BancoSchema } = require('./bancoModel');


function setupModels(mainDB, siac, banco) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(mainDB));
    Actmail.init(ActmailSchema, Actmail.config(siac));
    Banco.init(BancoSchema, Banco.config(banco));

    //Se inicializan relaciones de los modelos
    User.associate(siac.models);
}

module.exports = setupModels;