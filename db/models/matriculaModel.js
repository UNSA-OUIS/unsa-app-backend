const { Model, DataTypes, Sequelize, Op } = require('sequelize');

const ACDIDAL_TABLE = 'acdidal';

const MatriculaSchema = {
    cui: {
        allowNull: false,
        type: DataTypes.STRING,
        
    },
    nues: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    espe: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    cod0: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Matricula extends Model {
    static associate(models) {
        this.belongsTo(models.Alumno, {
            foreignKey: 'cui'
        });

        this.hasOne(models.Escuela, {
            as: 'escuela',
            foreignKey: 'nues'
        });

        this.hasMany(models.Especialidad, {
            as: 'especialidad',
            foreignKey: 'nues',
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACDIDAL_TABLE,
            modelName: 'Matricula',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACDIDAL_TABLE, MatriculaSchema, Matricula }