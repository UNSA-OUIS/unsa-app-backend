const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

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