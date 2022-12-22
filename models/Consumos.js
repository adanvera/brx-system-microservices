const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Consumos = sequelize.define('consumos', {
    id_consumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_machine: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    consumo: {
        type: DataTypes.STRING,
    },
    updated_at: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
})

module.exports = Consumos;