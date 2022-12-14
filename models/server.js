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
            params: '/api/params',
            client: '/api/client',
            images: '/api/images',
            mining: '/api/mining',
            luxor: '/api/luxor/queries',
            operation: '/api/operation',
            importaciones: '/api/importaciones',
            proveedores: '/api/proveedores',
            gastos: '/api/gastos',
            energias: '/api/energias',
            consumos: '/api/consumos',
            coinmining: '/api/coinmining',
            parametrizaciones: '/api/parametrizaciones',
        }
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors(
            {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true
            }
        ));
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));
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
        this.app.use(this.paths.luxor, require('../routes/Luxor'))
        this.app.use(this.paths.operation, require('../routes/operations'))
        this.app.use(this.paths.importaciones, require('../routes/importaciones'))
        this.app.use(this.paths.proveedores, require('../routes/proveedores'))
        this.app.use(this.paths.gastos, require('../routes/gastos'))
        this.app.use(this.paths.energias, require('../routes/Energias'))
        this.app.use(this.paths.consumos, require('../routes/consumos'))
        this.app.use(this.paths.coinmining, require('../routes/coinmining'))
        this.app.use(this.paths.params, require('../routes/parametrizciones'))
        this.app.use(this.paths.parametrizaciones, require('../routes/parametrizciones'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
