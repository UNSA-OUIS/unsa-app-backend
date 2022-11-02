const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTESCU_TABLE = 'actescu';

const EscuelaSchema = {
    facu: {
        allowNull: false,
        type: DataTypes.CHAR,
    },
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

class Escuela extends Model {
    static associate(models) {
        this.belongsTo(models.Matricula, {
            foreignKey: 'nues'
        });

        this.belongsTo(models.Facultad, {
            as: 'facultad',
            foreignKey: 'facu'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTESCU_TABLE,
            modelName: 'Escuela',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTESCU_TABLE, EscuelaSchema, Escuela }