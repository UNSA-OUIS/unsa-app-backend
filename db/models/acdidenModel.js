const { Model, DataTypes, Sequelize } = require('sequelize');

const ACDIDEN_TABLE = 'acdiden';

const AcdidenSchema = {
    cui: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    apn: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    sex: {
        allowNull: false,
        type: DataTypes.STRING
    },
    dic: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Acdiden extends Model {
    static associate(models) {
        /*this.hasOne(models.Customer, { 
            as: 'customer',
            foreignKey: 'userId'
        })*/

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACDIDEN_TABLE,
            modelName: 'Acdiden',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACDIDEN_TABLE, AcdidenSchema, Acdiden }