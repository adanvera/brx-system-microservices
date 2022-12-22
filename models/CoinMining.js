const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const CoinMining = sequelize.define('coinmining', {
    id_coinmining: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_machine: {
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    type: {
        type: DataTypes.STRING,
    },
    updated_at: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
})

module.exports = CoinMining;