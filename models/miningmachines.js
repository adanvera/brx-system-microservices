const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Mining = sequelize.define('miningmachines', {
    id_machine: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
    },
    ip:{
        type: DataTypes.STRING,
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
    machinedata: {
        type: DataTypes.STRING
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