const { Model, DataTypes, Sequelize } = require('sequelize');

const CONCEPTO_CAJA_TABLE = 'conceptos';

const ConceptoCajaSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    tipoPrecio: {
        field: 'tipo_precio',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    tipoAfectacion: {
        field: 'tipo_afectacion',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    tipoConceptoId: {
        field: 'tipo_concepto_id',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    clasificadorId: {
        field: 'clasificador_id',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    unidadMedidaId: {
        field: 'unidad_medida_id',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    codiDepe: {
        field: 'codi_depe',
        allowNull: false,
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    detraccion: {
        type: DataTypes.BOOLEAN
    },
    toCanje: {
        field: 'to_canje',
        type: DataTypes.BOOLEAN
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

class ConceptoCaja extends Model {
    static associate(models) {
        // this.hasOne(models.TipoPago, { 
        //     as: 'tipo_pago',
        //     foreignKey: "concepto_id"
        // });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CONCEPTO_CAJA_TABLE,
            modelName: 'ConceptoCaja',
            timestamps: true
        }
    }
}

module.exports = { CONCEPTO_CAJA_TABLE, ConceptoCajaSchema, ConceptoCaja }