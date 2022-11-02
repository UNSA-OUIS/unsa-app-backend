const { Model, DataTypes, Sequelize } = require('sequelize');

const DETALLE_CANJE_TABLE = 'detalles_canje';

const DetalleCanjeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    canjeId: {
        field: 'canje_id',
        type: DataTypes.BIGINT,
        references: {
            model: 'Canje',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    conceptoId: {
        field: 'concepto_id',
        type: DataTypes.BIGINT,
        references: {
            model: 'ConceptoCaja',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    cantidad: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

class DetalleCanje extends Model {
    static associate(models) {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DETALLE_CANJE_TABLE,
            modelName: 'DetalleCanje',
            timestamps: true
        }
    }
}

module.exports = { DETALLE_CANJE_TABLE, DetalleCanjeSchema, DetalleCanje }