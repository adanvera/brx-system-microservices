const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Energias = sequelize.define('energias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    precio: {
        type: DataTypes.DOUBLE
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

module.exports = Energias;
