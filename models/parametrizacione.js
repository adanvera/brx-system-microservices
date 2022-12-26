const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Parametrizacione = sequelize.define('parametrizaciones', {
    codigo: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },


}, {
    timestamps: false
})

module.exports = Parametrizacione;