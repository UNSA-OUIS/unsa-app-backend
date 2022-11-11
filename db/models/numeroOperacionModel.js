const { Model, DataTypes, Sequelize } = require('sequelize');

const NUMERO_OPERACION_TABLE = 'numeros_operacion';

const NumeroOperacionSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    numero: {
        field: 'numero',
        allowNull: false,
        type: DataTypes.STRING
    },
    entidadBancaria: {
        field: 'entidad_bancaria',
        allowNull: false,
        type: DataTypes.STRING
    },
    fecha: {
        field: 'fecha',
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    migrado: {
        field: 'migrado',
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    comprobanteId: {
        field: 'comprobante_id',
        type: DataTypes.BIGINT,
        references: {
            model: 'Comprobante',
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
    }
}

class NumeroOperacion extends Model {
    static associate(models) {
        this.belongsTo(models.Comprobante, {
            as: 'comprobante',
            foreignKey: 'comprobanteId'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: NUMERO_OPERACION_TABLE,
            modelName: 'NumeroOperacion',
            timestamps: true
        }
    }
}

module.exports = { NUMERO_OPERACION_TABLE, NumeroOperacionSchema, NumeroOperacion }