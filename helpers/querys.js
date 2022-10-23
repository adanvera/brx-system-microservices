const GET_ROL_BY_ID = 'SELECT roles.id_role, roles.description FROM roles JOIN users_roles ON roles.id_role = users_roles.id_role  JOIN users ON users.id_user = users_roles.id_user WHERE users.id_user = ';
// const GET_TICKET_BY_ID = 'SELECT id_ticket, id_machine, id_user, description_ticket, status, created_at, updated_at, ticket_comments FROM gestionagil_prodDB.tickets WHERE id_ticket = ';
const GET_TICKET_BY_ID = 'SELECT gestionagil_prodDB.tickets.id_ticket, gestionagil_prodDB.tickets.id_machine, CONCAT(  gestionagil_prodDB.users.name , " ", gestionagil_prodDB.users.last_name ) as id_user, gestionagil_prodDB.tickets.description_ticket, gestionagil_prodDB.tickets.status, gestionagil_prodDB.tickets.created_at, gestionagil_prodDB.tickets.updated_at, gestionagil_prodDB.tickets.ticket_comments FROM gestionagil_prodDB.tickets JOIN gestionagil_prodDB.users ON gestionagil_prodDB.tickets.id_user = gestionagil_prodDB.users.id_user WHERE gestionagil_prodDB.tickets.id_ticket = ';

module.exports = {
    GET_ROL_BY_ID,
    GET_TICKET_BY_ID
}