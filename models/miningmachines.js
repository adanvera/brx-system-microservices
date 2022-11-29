const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Mining = sequelize.define('miningmachines', {
    id_machine: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    machine_name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER
    },
    porcentaje: {
        type: DataTypes.INTEGER
    },
    id_model: {
        type: DataTypes.INTEGER
    }
    ,
    document: {
        type: DataTypes.STRING
    },
    consume_machine: {
        type: DataTypes.STRING
    },
    hashrate: {
        type: DataTypes.INTEGER
    },
    tempmax: {
        type: DataTypes.INTEGER
    },
    maxfan: {
        type: DataTypes.INTEGER
    },
    uptime: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
})

module.exports = Mining;