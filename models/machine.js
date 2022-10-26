const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Machines = sequelize.define('model_machines', {
    id_model: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description_model: {
        type: DataTypes.STRING
    },
    brand_machine: {
        type: DataTypes.STRING
    },
    consume_machine: {
        type: DataTypes.STRING
    }

}, {
    timestamps: false
})

module.exports = Machines;