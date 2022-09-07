const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_PAGO_TABLE = 'tipo_pago';

const TipoPagoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    codigoPago: {
        field: 'codigo_pago',
        allowNull: false,
        type: DataTypes.STRING
    },
    administradoId: {
        field: 'administrado_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'administrado',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    conceptoId: {
        field: 'concepto_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'concepto',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

class TipoPago extends Model {
    static associate(models) {
        this.belongsTo(models.Concepto, { as: 'concepto'})
        this.belongsTo(models.Administrado, { as: 'administrado'})

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TIPO_PAGO_TABLE,
            modelName: 'TipoPago',
            timestamps: true,
            paranoid: true,
            schema: process.env.DB_NAME4
        }
    }
}

module.exports = { TIPO_PAGO_TABLE, TipoPagoSchema, TipoPago }