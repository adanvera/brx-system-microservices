const { Sequelize } = require('sequelize')

//parametros requeridos dbname, usuario, contraseña
const sequelize = new Sequelize('gestionagil_prodDB', 'gestionagil_proyecto', 'Kj9JWqn}2(-x', {
    host: '92.38.150.137',
    dialect: 'mysql'
})

module.exports = sequelize;