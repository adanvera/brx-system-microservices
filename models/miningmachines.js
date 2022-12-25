const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Mining = sequelize.define('miningmachines', {
    id_machine: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: DataTypes.DATE,
    },
    ip: {
        type: DataTypes.STRING,
    },
    machine_name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
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
    },
    historialMantenience: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    revenue_day: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    revenue_hour: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    speed: {
        type: DataTypes.DOUBLE,
    },
    mining_date:{
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    timestamps: false
})

module.exports = Mining;