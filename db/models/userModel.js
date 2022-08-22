const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
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

class User extends Model {
    static associate(models) {
        this.hasOne(models.Actmail, { 
            as: 'siac_email',
            foreignKey: "mail",
            sourceKey: 'email',
            on: {
                mail: Sequelize.literal("`users`.`email` = `siac`.`actmail`.`mail`") 
              }
        })

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true,
            paranoid: true
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }