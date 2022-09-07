const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize').banco;
const modelsUnsapay = require('../libs/sequelize').unsapay.models;
const { Sequelize, Op } = require('sequelize');

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

    async getConceptos(query) {
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
}

module.exports = TicketService;