const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Ticket = sequelize.define('tickets', {
    id_ticket: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_machine: {
        type: DataTypes.INTEGER,
    },
    id_user: {
        type: DataTypes.INTEGER,
    },
    description_ticket: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING
    },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
    ticket_comments: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false
})

module.exports = Ticket;