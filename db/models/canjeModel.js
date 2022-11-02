const { Model, DataTypes, Sequelize } = require('sequelize');

const CANJE_TABLE = 'canjes';

const CanjeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    codiUsuario: {
        field: 'codi_usuario',
        allowNull: false,
        type: DataTypes.STRING
    },
    nuesEspe: {
        field: 'nues_espe',
        allowNull: false,
        type: DataTypes.CHAR
    },
    telefonoMovil: {
        field: 'telefono_movil',
        allowNull: false,
        type: DataTypes.STRING
    },
    cuentaCorrienteId: {
        field: 'cuenta_corriente_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'CuentaCorriente',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    nroOperacion: {
        field: 'nro_operacion',
        allowNull: false,
        type: DataTypes.STRING
    },
    fechaPago: {
        field: 'fecha_pago',
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    urlVoucher: {
        field: 'url_voucher',
        allowNull: false,
        type: DataTypes.STRING
    },
    userId: {
        field: 'user_id',
        type: DataTypes.BIGINT,
        /*references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'*/
    },
    observaciones: {
        field: 'observaciones',
        type: DataTypes.TEXT
    },
    estado: {
        field: 'estado',
        allowNull: false,
        type: DataTypes.STRING
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
    monto: {
        field: 'monto',
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    mensajeSupervisor: {
        field: 'mensaje_supervisor',
        type: DataTypes.TEXT
    },
    motivo: {
        field: 'motivo',
        type: DataTypes.TEXT
    },
    detalle: {
        field: 'detalle',
        type: DataTypes.STRING
    },
    email: {
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
    }
}

class Canje extends Model {
    static associate(models) {
        this.belongsTo(models.CuentaCorriente, { 
            as: 'cuenta',
            foreignKey: "cuentaCorrienteId"
        });

        this.belongsTo(models.Comprobante, { 
            as: 'comprobante',
            foreignKey: "comprobanteId",
        });
        this.hasMany(models.DetalleCanje,{
            as: 'detalles',
            foreignKey: 'canjeId'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CANJE_TABLE,
            modelName: 'Canje',
            timestamps: true
        }
    }
}

module.exports = { CANJE_TABLE, CanjeSchema, Canje }