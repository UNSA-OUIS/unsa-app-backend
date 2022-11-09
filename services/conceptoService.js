const { models } = require('../libs/sequelize').siscaja;
const { Op } = require("sequelize");

class ConceptoService {
    constructor() {

    }

    async findAllToCanjes() {
        const conceptos = await models.ConceptoCaja.findAll({ 
            where: { to_canje: true} 
        });

        return conceptos;
    }

    async findAllGlobalToCanjes() {
        const conceptos = await models.ConceptoCaja.findAll({ 
            where: { 
                codigo: {
                    [Op.between]: [900, 999]
                }
            } 
        });

        return conceptos;
    }

}
 
module.exports =  ConceptoService;