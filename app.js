require('dotenv').config();
const sequelize = require('./database/db');
const Server = require('./models/server');

const server = new Server();

server.listen();

async function main() {
    try {
        await sequelize.authenticate()
        console.log('Conexion exitosa del servidor');
    } catch (error) {
        console.log(error);
    }

}
main()