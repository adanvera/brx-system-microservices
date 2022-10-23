const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Machines = sequelize.define('miningmachines', {
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
        type: DataTypes.INTEGER,
    }
})

module.exports = Machines;