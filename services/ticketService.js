const boom = require('@hapi/boom');
const moment = require('moment');
const {models} = require('../libs/sequelize').banco;
const modelsUnsapay = require('../libs/sequelize').unsapay.models;
const { Sequelize, Op } = require('sequelize');
const bancoSequelize = require('../libs/sequelize').banco;

class TicketService {
    constructor () {

    }

    async find(query) {

        let whereBanco = {
            emailUnsapay: query.email,
            tipoPag: 'U',
            usadoUnsapay: 1
        };

        let whereTipoPago = {};

        if(!!query.conceptoId)
            whereTipoPago.conceptoId = query.conceptoId;
        if(!!query.administradoId)
            whereTipoPago.administradoId = query.administradoId;
        if(!!query.inscCodiWeb)
            whereBanco.inscCodiWeb = {[Op.like]: '%' + query.inscCodiWeb + '%'};
        if(!!query.fcreacionUnsapay)
            whereBanco.fcreacionUnsapay = {[Op.eq]: query.fcreacionUnsapay};
        if(!!query.estaId)
            whereBanco.estaId = query.estaId;

        const data = await models.Banco.findAll({
            where: whereBanco,
            /*attributes: ['id', 'emailUnsapay', 'tipoPag', 'usadoUnsapay', 'tipo_pago_id_unsapay',
                            'espe', 'inscCodiWeb', 'fcreacionUnsapay', 'estaId'],
            */
            attributes: {
                include: [
                    [
                        // Note the wrapping parentheses in the call below!
                        Sequelize.literal(`(
                            SELECT distinct(nomesp)
                            FROM siac.actespe AS especialidad
                            WHERE
                                especialidad.nues = banco.nues
                                AND
                                especialidad.numesp = banco.espe
                        )`),
                        'especialidad'
                    ]
                ]
            },
            include: [
                {
                    where: Object.keys(whereTipoPago).length !== 0 ? whereTipoPago: null,
                    association: 'tipo_pago',
                    include: ['concepto', 'administrado']
                },
                'escuela'
            ],
            order: [
                ['fcreacionUnsapay', 'DESC']
            ]
        });
        
        return data;
    }

    async getConcepts(query) {
        const data = await modelsUnsapay.Concepto.findAll({
            include: [
                {
                    where: {administrado_id: query.administradoId},
                    association: 'tipo_pago',
                }
            ],
            group: ["id"]
        });

        return data;
    }

    async generadeCode(data) {
        const activeCodes = await models.Banco.count({
            where:{
                usadoUnsapay: 1,
                estaId: 1,
                oper: 'A',
                tipoPagoIdUnsapay: data.tipo_pago.id,
                emailUnsapay: data.email
            }
        });
        //return activeCodes;

        if (activeCodes >= 3){
            throw boom.notAcceptable('Número máximo de códigos permitidos por usuario excedido.');
        }
        else{

            let localDateTime = moment().format('YYYY-MM-DD H:mm:ss');
            //return localDateTime;
            let cui = null;
            let nues = null;
            let espe = null;
            let escuela = '';

            if (data.administrado_id == 1) {
                cui = data.administrado.cui;
                nues = data.matricula.nues;
                espe = data.matricula.espe;

                if (data.matricula.especialidad == null) {
                    escuela = data.matricula.escuela.nesc;
                }
                else{
                    escuela = data.matricula.escuela.nesc + ' ' + data.matricula.especialidad.nomesp;
                }                        
            } 

            let actualizado = await models.Banco.update(
                {
                    cui: cui,
                    ndoc: data.administrado.dni,
                    apn: data.administrado.apellidos + ', ' + data.administrado.nombres,
                    nues: nues,                            
                    espe: espe,
                    emailUnsapay: data.email,
                    fcreacionUnsapay: localDateTime,
                    usadoUnsapay: 1
                },
                {
                    where: {
                        usadoUnsapay: 0,
                        estaId: 1,
                        oper: 'A',
                        tipoPagoIdUnsapay: data.tipo_pago.id
                    },
                    limit: 1
                }
            );

            if (actualizado) {
                const rows = await bancoSequelize.query(
                    `SELECT @codigo_web AS codigo, @monto_pago AS monto_pago;`,
                    { type: bancoSequelize.QueryTypes.SELECT },
                    
                );
                return rows[0];
            }
            else {
                throw boom.expectationFailed('Se agotaron los códigos disponibles en el banco. Por favor vuelva a intentarlo más tarde.');
            }
        }
    }
}

module.exports = TicketService;