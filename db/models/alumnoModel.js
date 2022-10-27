const { Model, DataTypes, Sequelize } = require('sequelize');

const ACDIDEN_TABLE = 'acdiden';

const AlumnoSchema = {
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

class Alumno extends Model {
    static associate(models) {
        this.hasMany(models.Matricula, { 
            as: 'matriculas',
            foreignKey: 'cui',
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACDIDEN_TABLE,
            modelName: 'Alumno',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { ACDIDEN_TABLE, AlumnoSchema, Alumno }