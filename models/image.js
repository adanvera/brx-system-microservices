const { INTEGER, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Image = sequelize.define('brx_images', {
    id_image: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url_image: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
})

module.exports = Image;