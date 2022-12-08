const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Client = sequelize.define('clients', {
    id_client: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    document: {
        type: DataTypes.STRING,
        primaryKey: true,
        required: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    last_name: {
        type: DataTypes.STRING,
        required: true
    },
    address: {
        type: DataTypes.STRING,
        required: true
    },
    phone: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    status: {
        type: DataTypes.INTEGER,
        required: true
    },
}, {
    timestamps: false
})

module.exports = Client;