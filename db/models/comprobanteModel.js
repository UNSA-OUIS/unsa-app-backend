const { Model, DataTypes, Sequelize } = require('sequelize');

const COMPROBANTE_TABLE = 'comprobantes';

const ComprobanteSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    serie: {
        field: 'serie',
        allowNull: false,
        type: DataTypes.STRING
    },
    correlativo: {
        field: 'correlativo',
        allowNull: false,
        type: DataTypes.CHAR
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    }
}

class Comprobante extends Model {
    static associate(models) {
        

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMPROBANTE_TABLE,
            modelName: 'Comprobante',
            timestamps: true
        }
    }
}

module.exports = { COMPROBANTE_TABLE, ComprobanteSchema, Comprobante }