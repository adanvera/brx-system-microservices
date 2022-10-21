const { Sequelize } = require('sequelize')

//parametros requeridos dbname, usuario, contraseña
const sequelize = new Sequelize('gestionagil_prodDB', 'gestionagil_proyecto', 'Kj9JWqn}2(-x', {
    host: '216.238.102.246',
    dialect: 'mysql'
})

module.exports = sequelize;