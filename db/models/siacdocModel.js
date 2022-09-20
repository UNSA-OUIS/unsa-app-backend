const { Model, DataTypes, Sequelize } = require('sequelize');

const SIACDOC_TABLE = 'SIAC_DOC';

const SiacdocSchema = {
    apn: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    codper: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    dic: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Siacdoc extends Model {
    static associate(models) {
        /*this.hasOne(models.Customer, { 
            as: 'customer',
            foreignKey: 'userId'
        })*/

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SIACDOC_TABLE,
            modelName: 'Siacdoc',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { SIACDOC_TABLE, SiacdocSchema, Siacdoc }