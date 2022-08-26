const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTESCU_TABLE = 'actescu';

const ActescuSchema = {
    nues: {
        allowNull: false,
        type: DataTypes.CHAR,
        primaryKey: true
    },
    nesc: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
}

class Actescu extends Model {
    static associate(models) {
        

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTESCU_TABLE,
            modelName: 'Actescu',
            timestamps: false,
            schema: "siac"
        }
    }
}

module.exports = { ACTESCU_TABLE, ActescuSchema, Actescu }