const {models} = require('../libs/sequelize').siac;

class DocenteService {
    constructor() {

    }

    async findOneByEmail(user_email) {
        const docente = await models.Docente.findOne({
            where: { correo: user_email },
            include: [
                { 
                    association: 'departamento', include: ['facultad']
                },
            ],

        });

        return docente;
    }

}
 
module.exports =  DocenteService;