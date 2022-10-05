
const {models} = require('../libs/sequelize').siscaja;
const { Sequelize, Op } = require('sequelize');

class CanjeService {
    constructor () {

    }

    async find(query) {

        let whereCaja = {
            email: query.email
        };

        const data = await models.Canje.findAll({
            where: whereCaja,
            attributes: ['id', 'estado', 'motivo', 'createdAt', 'fechaPago', 'nroOperacion', 'cuentaCorrienteId', 'urlVoucher', 'comprobanteId'],
            include: ['comprobante',
                { association: 'cuenta', attributes: ['id', 'numero_cuenta', 'banco', 'moneda', 'descripcion'] },
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        
        return data;
    }

}

module.exports = CanjeService;