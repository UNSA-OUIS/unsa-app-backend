const { User, UserSchema } = require('./userModel');
const { Actmail, ActmailSchema } = require('./actmailModel');
const { Banco, BancoSchema } = require('./bancoModel');
const { Concepto, ConceptoSchema } = require('./conceptoModel');
const { Administrado, AdministradoSchema } = require('./administradoModel');
const { TipoPago, TipoPagoSchema } = require('./tipoPagoModel');
const { Actescu, ActescuSchema } = require('./actescuModel');
const { Actespe, ActespeSchema } = require('./actespeModel');
const { Acdiden, AcdidenSchema} = require('./acdidenModel');
const { Siacdoc, SiacdocSchema} = require('./siacdocModel');
const { Acdidal, AcdidalSchema} = require('./acdidalModel');


function setupModels(mainDB, siac, banco, unsapay) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(mainDB));
    Actmail.init(ActmailSchema, Actmail.config(siac));
    Acdiden.init(AcdidenSchema, Acdiden.config(siac));
    Acdidal.init(AcdidalSchema, Acdidal.config(siac));
    Banco.init(BancoSchema, Banco.config(banco));
    Concepto.init(ConceptoSchema, Concepto.config(unsapay));
    Administrado.init(AdministradoSchema, Administrado.config(unsapay));
    TipoPago.init(TipoPagoSchema, TipoPago.config(unsapay));
    Actescu.init(ActescuSchema, Actescu.config(siac));
    Actespe.init(ActespeSchema, Actespe.config(siac));
    Siacdoc.init(SiacdocSchema, Siacdoc.config(siac));

    //Se inicializan relaciones de los modelos
    User.associate(siac.models);
    TipoPago.associate(unsapay.models);
    Concepto.associate(unsapay.models);
    Banco.associate(unsapay.models, siac.models);
}

module.exports = setupModels;