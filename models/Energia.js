const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Energia = sequelize.define('energias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    precio: {
        type: DataTypes.FLOAT
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

module.exports = Energia;