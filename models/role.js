const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Role = sequelize.define('roles', {
    id_role: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    },
    sub_permissons: {
        type: DataTypes.INTEGER
    }
    ,
    access: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = Role;