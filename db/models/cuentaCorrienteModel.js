const { Model, DataTypes, Sequelize } = require('sequelize');

const CUENTA_TABLE = 'cuentas_corrientes';

const CuentaSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    numeroCuenta: {
        field: 'numero_cuenta',
        allowNull: false,
        type: DataTypes.STRING
    },
    banco: {
        field: 'banco',
        allowNull: false,
        type: DataTypes.STRING
    },
    moneda: {
        field: 'moneda',
        allowNull: false,
        type: DataTypes.STRING
    },
    descripcion: {
        field: 'descripcion',
        allowNull: false,
        type: DataTypes.STRING
    },
}

class CuentaCorriente extends Model {
    static associate(models) {
        

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUENTA_TABLE,
            modelName: 'CuentaCorriente',
            timestamps: false,
        }
    }
}

module.exports = { CUENTA_TABLE, CuentaSchema, CuentaCorriente }