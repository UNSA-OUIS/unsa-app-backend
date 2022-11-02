const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTESPE_TABLE = 'actespe';

const EspecialidadSchema = {
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

class Especialidad extends Model {
    static associate(models) {
        this.belongsTo(models.Matricula);

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTESPE_TABLE,
            modelName: 'Especialidad',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTESPE_TABLE, EspecialidadSchema, Especialidad }