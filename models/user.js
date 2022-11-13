const { INTEGER, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    document: {
        type: DataTypes.STRING,
        unique: {
            args: 'document',
            message: 'Este documento ya se encuentra registrado'
        }
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: {
            args: 'email',
            message: 'The email is already taken!'
        }
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
})

module.exports = User;