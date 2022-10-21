const { Model, DataTypes, Sequelize } = require('sequelize');

const SIACDOC_TABLE = 'SIAC_DOC';

const DocenteSchema = {
    depend: {
        allowNull: false,
        type: DataTypes.CHAR,
    },
    apn: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    codper: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
    },
    dic: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Docente extends Model {
    static associate(models) {
        this.belongsTo(models.Departamento, { 
            as: 'departamento',
            foreignKey: 'depend'
        })

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SIACDOC_TABLE,
            modelName: 'Docente',
            timestamps: false,
            schema: process.env.DB_NAME2
        }
    }
}

module.exports = { SIACDOC_TABLE, DocenteSchema, Docente }