const {models} = require('../libs/sequelize').siac;
const boom = require('@hapi/boom');

class EmailService {
    constructor() {

    }

    async findOne(email) {
        let [user_email, domain_email] = email.split('@');
        if (domain_email !== 'unsa.edu.pe') {
            throw boom.notAcceptable('No es correo unsa!');
        }

        let emailDB = await models.Email.findOne({
            where: { mail: user_email },
        });

        return emailDB;
    }

}
 
module.exports =  EmailService;