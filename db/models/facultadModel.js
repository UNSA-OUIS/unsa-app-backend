const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTFACU_TABLE = 'actfacu';

const FacultadSchema = {
    facu: {
        allowNull: false,
        type: DataTypes.CHAR,
        primaryKey: true
    },
    nfac: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    area: {
        allowNull: false,
        type: DataTypes.SMALLINT,
    }
}

class Facultad extends Model {
    static associate(models) {
        this.hasMany(models.Departamento, {
            as: 'departamentos',
            foreignKey: 'facu'
        });

        this.hasMany(models.Escuela, {
            as: 'escuelas',
            foreignKey: 'facu'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTFACU_TABLE,
            modelName: 'Facultad',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTFACU_TABLE, FacultadSchema, Facultad }