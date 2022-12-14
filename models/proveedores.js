const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Proveedores = sequelize.define('proveedores', {
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

}, {
    timestamps: false
})

module.exports = Proveedores;
