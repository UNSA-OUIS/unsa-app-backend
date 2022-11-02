const { User, UserSchema } = require('./userModel');
const { Email, EmailSchema } = require('./emailModel');
const { Banco, BancoSchema } = require('./bancoModel');
const { Concepto, ConceptoSchema } = require('./conceptoModel');
const { Administrado, AdministradoSchema } = require('./administradoModel');
const { TipoPago, TipoPagoSchema } = require('./tipoPagoModel');
const { Escuela, EscuelaSchema } = require('./escuelaModel');
const { Especialidad, EspecialidadSchema } = require('./especialidadModel');
const { Canje, CanjeSchema } = require('./canjeModel');
const { Comprobante, ComprobanteSchema } = require('./comprobanteModel');
const { CuentaCorriente, CuentaCorrienteSchema } = require('./cuentaCorrienteModel');
const { Alumno, AlumnoSchema} = require('./alumnoModel');
const { Docente, DocenteSchema} = require('./docenteModel');
const { Matricula, MatriculaSchema} = require('./matriculaModel');
const { ConceptoCaja, ConceptoCajaSchema} = require('./conceptoCajaModel');
const { Departamento, DepartamentoSchema } = require('./departamentoModel');
const { Facultad, FacultadSchema } = require('./facultadModel');
const { DetalleCanje, DetalleCanjeSchema } = require('./detallesCanjeModel');


function setupModels(mainDB, siac, banco, unsapay, siscaja) {
    //Se inicializan modelos
    User.init(UserSchema, User.config(mainDB));
    Email.init(EmailSchema, Email.config(siac));
    Alumno.init(AlumnoSchema, Alumno.config(siac));
    Matricula.init(MatriculaSchema, Matricula.config(siac));
    Banco.init(BancoSchema, Banco.config(banco));
    Concepto.init(ConceptoSchema, Concepto.config(unsapay));
    Administrado.init(AdministradoSchema, Administrado.config(unsapay));
    TipoPago.init(TipoPagoSchema, TipoPago.config(unsapay));
    Escuela.init(EscuelaSchema, Escuela.config(siac));
    Especialidad.init(EspecialidadSchema, Especialidad.config(siac));
    Canje.init(CanjeSchema, Canje.config(siscaja));
    Comprobante.init(ComprobanteSchema, Comprobante.config(siscaja));
    CuentaCorriente.init(CuentaCorrienteSchema, CuentaCorriente.config(siscaja));
    Docente.init(DocenteSchema, Docente.config(siac));
    ConceptoCaja.init(ConceptoCajaSchema, ConceptoCaja.config(siscaja));
    Departamento.init(DepartamentoSchema, Departamento.config(siac));
    Facultad.init(FacultadSchema, Facultad.config(siac));
    DetalleCanje.init(DetalleCanjeSchema, DetalleCanje.config(siscaja));

    //Se inicializan relaciones de los modelos
    User.associate(siac.models);
    TipoPago.associate(unsapay.models);
    Concepto.associate(unsapay.models);
    Banco.associate(unsapay.models, siac.models);
    Canje.associate(siscaja.models);
    Alumno.associate(siac.models);
    Matricula.associate(siac.models);
    Docente.associate(siac.models);
    Departamento.associate(siac.models);
    Facultad.associate(siac.models);
    Escuela.associate(siac.models);
    
}

module.exports = setupModels;