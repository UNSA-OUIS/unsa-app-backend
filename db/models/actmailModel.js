const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTMAIL_TABLE = 'actmail';

const ActmailSchema = {
    cui: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    mail: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
}

class Actmail extends Model {
    static associate(models) {
        /*this.hasOne(models.Customer, { 
            as: 'customer',
            foreignKey: 'userId'
        })*/

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTMAIL_TABLE,
            modelName: 'Actmail',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTMAIL_TABLE, ActmailSchema, Actmail }