const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Importaciones = sequelize.define('importaciones', {
    id_importacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    id_proveedor: {
        type: DataTypes.INTEGER
    },
    machinedata: {
        type: DataTypes.STRING
    },
    empresa_envio: {
        type: DataTypes.STRING
    },
    tracking_number: {
        type: DataTypes.STRING
    },
    valor_envio: {
        type: DataTypes.FLOAT
    },
    fecha_envio: {
        type: DataTypes.DATE
    },
    fecha_arribo: {
        type: DataTypes.DATE
    },
    comentario_importacion: {
        type: DataTypes.STRING
    },
    articulos: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = Importaciones;