const { Model, DataTypes, Sequelize } = require('sequelize');

const CONCEPTO_TABLE = 'concepto';

const ConceptoSchema = {
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
    codigoCaja: {
        field: 'codigo_caja',
        allowNull: false,
        type: DataTypes.INTEGER
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

class Concepto extends Model {
    static associate(models) {
        this.hasOne(models.TipoPago, { 
            as: 'tipo_pago',
            foreignKey: "concepto_id"
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CONCEPTO_TABLE,
            modelName: 'Concepto',
            timestamps: true,
            paranoid: true,
            schema: process.env.DB_NAME4
        }
    }
}

module.exports = { CONCEPTO_TABLE, ConceptoSchema, Concepto }