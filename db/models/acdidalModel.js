const { Model, DataTypes, Sequelize } = require('sequelize');

const ACDIDAL_TABLE = 'acdidal';

const AcdidalSchema = {
    cui: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    nues: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    espe: {
        allowNull: false,
        type: DataTypes.STRING
    },
    cod0: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Acdidal extends Model {
    static associate(models) {
        /*this.hasOne(models.Customer, { 
            as: 'customer',
            foreignKey: 'userId'
        })*/

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACDIDAL_TABLE,
            modelName: 'Acdidal',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACDIDAL_TABLE, AcdidalSchema, Acdidal }