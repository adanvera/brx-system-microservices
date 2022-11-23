const GET_ROL_BY_ID = 'SELECT roles.id_role, roles.description , roles.access , roles.sub_permissons FROM roles JOIN users_roles ON roles.id_role = users_roles.id_role JOIN users ON users.id_user = users_roles.id_user WHERE users.id_user = '
const GET_TICKETS = 'SELECT gestionagil_prodDB.tickets.id_ticket, gestionagil_prodDB.tickets.id_machine, CONCAT(  gestionagil_prodDB.users.name , " ", gestionagil_prodDB.users.last_name ) as id_user, gestionagil_prodDB.tickets.description_ticket, gestionagil_prodDB.tickets.status, gestionagil_prodDB.tickets.created_at, gestionagil_prodDB.tickets.updated_at, gestionagil_prodDB.tickets.priority , gestionagil_prodDB.tickets.ticket_name , gestionagil_prodDB.tickets.ticket_comments FROM gestionagil_prodDB.tickets JOIN gestionagil_prodDB.users ON gestionagil_prodDB.tickets.id_user = gestionagil_prodDB.users.id_user WHERE gestionagil_prodDB.tickets.status NOT LIKE 0'
const GET_TICKET_BY_ID = 'SELECT gestionagil_prodDB.tickets.id_ticket, gestionagil_prodDB.tickets.id_machine, CONCAT(  gestionagil_prodDB.users.name , " ", gestionagil_prodDB.users.last_name ) as id_user, gestionagil_prodDB.tickets.description_ticket, gestionagil_prodDB.tickets.status, gestionagil_prodDB.tickets.created_at, gestionagil_prodDB.tickets.updated_at, gestionagil_prodDB.tickets.ticket_comments , gestionagil_prodDB.tickets.ticket_name , gestionagil_prodDB.tickets.priority FROM gestionagil_prodDB.tickets JOIN gestionagil_prodDB.users ON gestionagil_prodDB.tickets.id_user = gestionagil_prodDB.users.id_user WHERE gestionagil_prodDB.tickets.id_ticket = '
const GET_MACHINE_BY_ID = "SELECT id_machine, status, porcentaje, id_model FROM gestionagil_prodDB.miningmachines WHERE gestionagil_prodDB.miningmachines.id_machine = ";
const UPDATE_IMAGE = 'UPDATE gestionagil_prodDB.brx_images SET url_image=(?) WHERE id_image='
const GET_URL_IMAGE = "SELECT gestionagil_prodDB.brx_images.url_image FROM gestionagil_prodDB.brx_images JOIN gestionagil_prodDB.users ON gestionagil_prodDB.brx_images.id_image = gestionagil_prodDB.users.id_image WHERE gestionagil_prodDB.brx_images.id_image = "
const GET_USERS = 'SELECT DISTINCT(gestionagil_prodDB.users.id_user), gestionagil_prodDB.users.document, gestionagil_prodDB.users.email,gestionagil_prodDB.users.status, gestionagil_prodDB.users.name, gestionagil_prodDB.users.last_name,gestionagil_prodDB.users.phone, gestionagil_prodDB.users.register, gestionagil_prodDB.users.update_data, gestionagil_prodDB.roles.description as rol , gestionagil_prodDB.roles.access FROM gestionagil_prodDB.users JOIN gestionagil_prodDB.users_roles ON gestionagil_prodDB.users.id_user = gestionagil_prodDB.users_roles.id_user JOIN gestionagil_prodDB.roles ON gestionagil_prodDB.users_roles.id_role = gestionagil_prodDB.roles.id_role WHERE gestionagil_prodDB.users.status =1 OR  gestionagil_prodDB.users.status = 0'
const GET_MINING_MACHINES = 'SELECT gestionagil_prodDB.miningmachines.id_machine, gestionagil_prodDB.miningmachines.status, gestionagil_prodDB.miningmachines.porcentaje, gestionagil_prodDB.miningmachines.id_model, CONCAT(  gestionagil_prodDB.clients .name , " ", gestionagil_prodDB.clients.last_name ) as name, gestionagil_prodDB.miningmachines.consume_machine  , gestionagil_prodDB.model_machines.description_model FROM gestionagil_prodDB.miningmachines JOIN gestionagil_prodDB.model_machines on gestionagil_prodDB.miningmachines.id_model = gestionagil_prodDB.model_machines .id_model JOIN gestionagil_prodDB.clients on gestionagil_prodDB.miningmachines.document = gestionagil_prodDB.clients.document '
const ADD_ROL_TO_USER = 'INSERT INTO users_roles (id_user,id_role)  VALUES (?,?)'
const UPDATE_ROL_TO_USER = 'UPDATE users_roles SET id_role = ? WHERE id_user = ?'
const GET_ROLE_ID = 'SELECT id_role, description, status, access , sub_permissons FROM gestionagil_prodDB.roles WHERE id_role ='
const UPDATE_ROL = 'UPDATE gestionagil_prodDB.roles SET gestionagil_prodDB.roles.description = ? , gestionagil_prodDB.roles.access = ? , gestionagil_prodDB.roles.sub_permissons = ? WHERE id_role='

//operaciones
const GET_OPERATIONS_BY_CLIENT = "SELECT * FROM operations WHERE id_client = ?"



module.exports = {
    GET_ROL_BY_ID,
    GET_TICKETS,
    GET_TICKET_BY_ID,
    GET_MACHINE_BY_ID,
    UPDATE_IMAGE,
    GET_URL_IMAGE,
    GET_USERS,
    GET_MINING_MACHINES,
    ADD_ROL_TO_USER,
    UPDATE_ROL_TO_USER,
    GET_ROLE_ID,
    UPDATE_ROL,
    GET_OPERATIONS_BY_CLIENT,
 
}