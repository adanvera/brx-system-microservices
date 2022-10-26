const express = require('express');
const cors = require('cors');
const session = require("express-session");


class Server {

    constructor() {
        this.app = express();
        this.port = 4000

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/user',
            roles: '/api/roles',
            machines: '/api/machines',
            tickets: '/api/tickets',
            client: '/api/client',
            images: '/api/images'
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));
        this.app.use(session({
            secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
            saveUninitialized: true,
            resave: true,
          }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/users'));
        this.app.use(this.paths.roles, require('../routes/roles'));
        this.app.use(this.paths.machines, require('../routes/machines'));
        this.app.use(this.paths.tickets, require('../routes/ticket'));
        this.app.use( this.paths.client, require('../routes/clients'));
        this.app.use(this.paths.images, require('../routes/images'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
