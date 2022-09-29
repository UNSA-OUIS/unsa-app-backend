const { User, UserSchema } = require('./userModel');
const { Actmail, ActmailSchema } = require('./actmailModel');
const { Banco, BancoSchema } = require('./bancoModel');
const { Concepto, ConceptoSchema } = require('./conceptoModel');
const { Administrado, AdministradoSchema } = require('./administradoModel');
const { TipoPago, TipoPagoSchema } = require('./tipoPagoModel');
const { Actescu, ActescuSchema } = require('./actescuModel');
const { Actespe, ActespeSchema } = require('./actespeModel');
const { Canje, CanjeSchema } = require('./canjeModel');
const { Comprobante, ComprobanteSchema } = require('./comprobanteModel');
const { CuentaCorriente, CuentaCorrienteSchema } = require('./cuentaCorrienteModel');


function setupModels(mainDB, siac, banco, unsapay, siscaja) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(mainDB));
    Actmail.init(ActmailSchema, Actmail.config(siac));
    Banco.init(BancoSchema, Banco.config(banco));
    Concepto.init(ConceptoSchema, Concepto.config(unsapay));
    Administrado.init(AdministradoSchema, Administrado.config(unsapay));
    TipoPago.init(TipoPagoSchema, TipoPago.config(unsapay));
    Actescu.init(ActescuSchema, Actescu.config(siac));
    Actespe.init(ActespeSchema, Actespe.config(siac));
    Canje.init(CanjeSchema, Canje.config(siscaja));
    Comprobante.init(ComprobanteSchema, Comprobante.config(siscaja));
    CuentaCorriente.init(CuentaCorrienteSchema, CuentaCorriente.config(siscaja));

    //Se inicializan relaciones de los modelos
    User.associate(siac.models);
    TipoPago.associate(unsapay.models);
    Concepto.associate(unsapay.models);
    Banco.associate(unsapay.models, siac.models);
    Canje.associate(siscaja.models);
}

module.exports = setupModels;