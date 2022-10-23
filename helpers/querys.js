const GET_ROL_BY_ID = 'SELECT roles.id_role, roles.description FROM roles JOIN users_roles ON roles.id_role = users_roles.id_role  JOIN users ON users.id_user = users_roles.id_user WHERE users.id_user = ';
const GET_TICKET_BY_ID = 'SELECT id_ticket, id_machine, id_user, description_ticket, status, created_at, updated_at FROM gestionagil_prodDB.tickets WHERE id_ticket = ';

module.exports = {
    GET_ROL_BY_ID,
    GET_TICKET_BY_ID
}