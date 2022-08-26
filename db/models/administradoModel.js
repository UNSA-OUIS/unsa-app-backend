const { Model, DataTypes, Sequelize } = require('sequelize');

const ADMINISTRADO_TABLE = 'administrado';

const AdministradoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE
    }
}

class Administrado extends Model {
    static associate(models) {
        

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ADMINISTRADO_TABLE,
            modelName: 'Administrado',
            timestamps: true,
            paranoid: true,
            schema: "db_unsapay"
        }
    }
}

module.exports = { ADMINISTRADO_TABLE, AdministradoSchema, Administrado }