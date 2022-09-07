const { Model, DataTypes, Sequelize, Op } = require('sequelize');

const BANCO_TABLE = 'banco_bcp';

const BancoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    postId: {
        field: 'post_id',
        allowNull: true,
        type: DataTypes.INTEGER
    },
    inscId: {
        field: 'insc_id',
        allowNull: true,
        type: DataTypes.INTEGER
    },
    inscCodiWeb: {
        field: 'insc_codi_web',
        allowNull: true,
        type: DataTypes.STRING
    },
    apn: {
        field: 'apn',
        allowNull: true,
        type: DataTypes.STRING
    },
    ndoc: {
        field: 'ndoc',
        allowNull: true,
        type: DataTypes.STRING
    },
    cui: {
        field: 'cui',
        allowNull: true,
        type: DataTypes.STRING
    },
    nues: {
        field: 'nues',
        allowNull: true,
        type: DataTypes.STRING
    },
    espe: {
        field: 'espe',
        allowNull: true,
        type: DataTypes.STRING
    },
    proc: {
        field: 'proc',
        allowNull: true,
        type: DataTypes.STRING
    },
    anho: {
        field: 'anho',
        allowNull: true,
        type: DataTypes.INTEGER
    },
    estaId: {
        field: 'esta_id',
        allowNull: true,
        type: DataTypes.CHAR
    },
    montCalc: {
        field: 'mont_calc',
        allowNull: true,
        type: DataTypes.DOUBLE
    },
    montPagado: {
        field: 'mont_pagado',
        allowNull: true,
        type: DataTypes.DOUBLE
    },
    numRecibo: {
        field: 'num_recibo',
        allowNull: true,
        type: DataTypes.BIGINT
    },
    nroReso: {
        field: 'nro_reso',
        allowNull: true,
        type: DataTypes.STRING
    },
    fpago: {
        field: 'fpago',
        allowNull: true,
        type: DataTypes.DATE
    },
    tipoPag: {
        field: 'tipo_pag',
        allowNull: true,
        type: DataTypes.CHAR
    },
    proc: {
        field: 'proc',
        allowNull: true,
        type: DataTypes.STRING
    },
    tipoPagoIdUnsapay: {
        field: 'tipo_pago_id_unsapay',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'tipo_pago',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    oper: {
        field: 'oper',
        allowNull: true,
        type: DataTypes.CHAR
    },
    screen: {
        field: 'screen',
        allowNull: true,
        type: DataTypes.STRING
    },
    formPago: {
        field: 'form_pago',
        allowNull: true,
        type: DataTypes.CHAR
    },
    dscto: {
        field: 'dscto',
        allowNull: true,
        type: DataTypes.STRING
    },
    pension: {
        field: 'pension',
        allowNull: true,
        type: DataTypes.CHAR
    },
    fvencimiento: {
        field: 'fvencimiento',
        allowNull: true,
        type: DataTypes.DATEONLY
    },
    femision: {
        field: 'femision',
        allowNull: true,
        type: DataTypes.DATE
    },
    frecepcion: {
        field: 'frecepcion',
        allowNull: true,
        type: DataTypes.DATE
    },
    flag: {
        field: 'flag',
        allowNull: true,
        type: DataTypes.CHAR
    },
    emailUnsapay: {
        field: 'email_unsapay',
        allowNull: true,
        type: DataTypes.STRING
    },
    fcreacionUnsapay: {
        field: 'fcreacion_unsapay',
        allowNull: true,
        type: DataTypes.DATE
    },
    usadoUnsapay: {
        field: 'usado_unsapay',
        allowNull: true,
        type: DataTypes.TINYINT
    },
    serie: {
        field: 'serie',
        allowNull: true,
        type: DataTypes.STRING
    },
    correlativo: {
        field: 'correlativo',
        allowNull: true,
        type: DataTypes.BIGINT
    }
}

class Banco extends Model {
    static associate(unsapayModels, siacModels) {
        this.belongsTo(unsapayModels.TipoPago, { 
            as: 'tipo_pago',
            foreignKey: "tipo_pago_id_unsapay"
        });

        this.belongsTo(siacModels.Actescu, {
            as: 'escuela',
            foreignKey: "nues"
        });
        this.belongsTo(siacModels.Actespe, {
            as: 'especialidad',
            foreignKey: "nues",
            sourceKey: "nues",
            scope: {
                [Op.and]: Sequelize.where(Sequelize.col("Banco.espe"),
                    // '=',
                    '=', // or you can use '=',
                    Sequelize.col("especialidad.numesp")),
            },
            constraints: false,
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BANCO_TABLE,
            modelName: 'Banco',
            timestamps: false,
            paranoid: false,
            schema: process.env.DB_NAME3
        }
    }
}

module.exports = { BANCO_TABLE, BancoSchema, Banco }