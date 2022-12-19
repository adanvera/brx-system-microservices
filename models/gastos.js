const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Gastos = sequelize.define('gastos', {
    id_gasto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DOUBLE
    },
    type: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: false
})

module.exports = Gastos;