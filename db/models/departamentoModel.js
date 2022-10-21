const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTDEPA_TABLE = 'actdepa';

const DepartamentoSchema = {
    facu: {
        allowNull: false,
        type: DataTypes.CHAR,
    },
    depa: {
        allowNull: false,
        type: DataTypes.CHAR,
        primaryKey: true
    },
    ndep: {
        allowNull: false,
        type: DataTypes.STRING,
    }
    ,
    fln: {
        allowNull: false,
        type: DataTypes.SMALLINT,
    }
}

class Departamento extends Model {
    static associate(models) {
        this.hasMany(models.Docente, {
            as: 'docentes',
            foreignKey: 'depend'
        });
        this.belongsTo(models.Facultad, {
            as: 'facultad',
            foreignKey: 'facu'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTDEPA_TABLE,
            modelName: 'Departamento',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACTDEPA_TABLE, DepartamentoSchema, Departamento }