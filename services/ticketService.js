const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize').banco;

class TicketService {
    constructor () {

    }

    async find(query) {
        const data = await models.Banco.findAll({
            where: { 
                emailUnsapay: query.email,
                tipoPag: 'U',
                usadoUnsapay: 1
            },
            order: [
                ['fcreacionUnsapay', 'DESC']
            ]
        });
        
        return data;
    }
}

module.exports = TicketService;