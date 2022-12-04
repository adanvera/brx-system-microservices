const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Machines = sequelize.define('machines', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    algorithms: {
        type: DataTypes.STRING
    },
    specs: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    timestamps: false
})

module.exports = Machines;