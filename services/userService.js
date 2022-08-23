const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize').mainDB;
const siacModels = require('../libs/sequelize').siac.models;

class UsersService {
    constructor () {
        
    }

    async create(data){
        const newUser = await models.User.create(data);

        return newUser;
    }

    async find(){

        const data = await models.User.findAll({
            paranoid: false
        });
        return data;
        var bar = new Promise((resolve, reject) => {
            data.forEach(async (user, index, array) => {
                let emailName = user.dataValues.email.substring(0, user.dataValues.email.indexOf('@'));
                user.dataValues.actmail = await siacModels.Actmail.findOne({
                    where: { mail: emailName } 
                });
                if (index === array.length -1) resolve();
            });
        });
        
        return bar.then(()=>{
            return data;
        })

    }

    async findOne(id){
        const user = await models.User.findByPk(id);

        if (!user) {
            throw boom.notFound('user not found');
        }

        return user;

    }

    async update(id, changes){
        const user = await this.findOne(id);
        const rpta = await user.update(changes);

        return rpta;
    }

    async delete(id){
        const user = await this.findOne(id);
        await user.destroy();

        return {id};
    }

    async restore(id){
        const user = await models.User.findByPk(id, {paranoid: false});
        await user.restore();

        return user;
    }
}

module.exports = UsersService;