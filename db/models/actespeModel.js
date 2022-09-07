const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTESPE_TABLE = 'actespe';

const ActespeSchema = {
    nues: {
        allowNull: false,
        type: DataTypes.CHAR,
        primaryKey: true
    },
    numesp: {
        allowNull: false,
        type: DataTypes.CHAR,
        primaryKey: true
    },
    nomesp: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
}

class Actespe extends Model {
    static associate(models) {
        

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTESPE_TABLE,
            modelName: 'Actespe',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTESPE_TABLE, ActespeSchema, Actespe }