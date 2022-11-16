const express = require('express');
const cors = require('cors');


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
            images: '/api/images',
            mining: '/api/mining',
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

        /* -------------------------------------------------------------------------- */

        this.app.get("/no-cors", (req, res) => {
            console.info("GET /no-cors");
            res.json({
                text: "You should not see this via a CORS request."
            });
        });

        /* -------------------------------------------------------------------------- */

        this.app.head("/simple-cors", cors(), (req, res) => {
            console.info("HEAD /simple-cors");
            res.sendStatus(204);
        });
        this.app.get("/simple-cors", cors(), (req, res) => {
            console.info("GET /simple-cors");
            res.json({
                text: "Simple CORS requests are working. [GET]"
            });
        });
        this.app.post("/simple-cors", cors(), (req, res) => {
            console.info("POST /simple-cors");
            res.json({
                text: "Simple CORS requests are working. [POST]"
            });
        });

        /* -------------------------------------------------------------------------- */

        this.app.options("/complex-cors", cors());
        this.app.delete("/complex-cors", cors(), (req, res) => {
            console.info("DELETE /complex-cors");
            res.json({
                text: "Complex CORS requests are working. [DELETE]"
            });
        });

        /* -------------------------------------------------------------------------- */

        const issue2options = {
            origin: true,
            methods: ["POST"],
            credentials: true,
            maxAge: 3600
        };
        this.app.options("/issue-2", cors(issue2options));
        this.app.post("/issue-2", cors(issue2options), (req, res) => {
            console.info("POST /issue-2");
            res.json({
                text: "Issue #2 is fixed."
            });
        });


    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/users'));
        this.app.use(this.paths.roles, require('../routes/roles'));
        this.app.use(this.paths.machines, require('../routes/machines'));
        this.app.use(this.paths.tickets, require('../routes/ticket'));
        this.app.use(this.paths.client, require('../routes/clients'));
        this.app.use(this.paths.images, require('../routes/images'));
        this.app.use(this.paths.mining, require('../routes/miningmachines'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
