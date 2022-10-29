const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Mining = sequelize.define('miningmachines', {
    id_machine: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    }

}, {
    timestamps: false
})

module.exports = Mining;