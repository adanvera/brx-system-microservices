const GET_ROL_BY_ID = 'SELECT roles.id_role, roles.description , roles.access , roles.sub_permissons FROM roles JOIN users_roles ON roles.id_role = users_roles.id_role JOIN users ON users.id_user = users_roles.id_user WHERE users.id_user = '
const GET_TICKETS = 'SELECT gestionagil_prodDB.tickets.id_ticket, gestionagil_prodDB.tickets.id_machine, CONCAT(  gestionagil_prodDB.users.name , " ", gestionagil_prodDB.users.last_name ) as id_user, gestionagil_prodDB.tickets.description_ticket, gestionagil_prodDB.tickets.status, gestionagil_prodDB.tickets.created_at, gestionagil_prodDB.tickets.updated_at, gestionagil_prodDB.tickets.priority , gestionagil_prodDB.tickets.ticket_name , gestionagil_prodDB.tickets.ticket_comments, CONCAT( u.name , " ",u.last_name ) as assigned_to FROM gestionagil_prodDB.tickets JOIN gestionagil_prodDB.users ON gestionagil_prodDB.tickets.id_user = gestionagil_prodDB.users.id_user JOIN gestionagil_prodDB.users u ON gestionagil_prodDB.tickets.assigned_to = u.id_user WHERE gestionagil_prodDB.tickets.status NOT LIKE 0 '
const GET_TICKET_BY_ID = 'SELECT gestionagil_prodDB.tickets.id_ticket, gestionagil_prodDB.tickets.id_machine,gestionagil_prodDB.miningmachines.document as document , CONCAT(  gestionagil_prodDB.users.name , " ", gestionagil_prodDB.users.last_name ) as id_user, gestionagil_prodDB.tickets.description_ticket, gestionagil_prodDB.tickets.status, gestionagil_prodDB.tickets.created_at, gestionagil_prodDB.tickets.updated_at, gestionagil_prodDB.tickets.ticket_comments , gestionagil_prodDB.tickets.ticket_historial  , gestionagil_prodDB.tickets.ticket_name , gestionagil_prodDB.tickets.priority , CONCAT( u.name , " ",u.last_name ) as assigned_to , gestionagil_prodDB.miningmachines.historialMantenience FROM gestionagil_prodDB.tickets JOIN gestionagil_prodDB.users ON gestionagil_prodDB.tickets.id_user = gestionagil_prodDB.users.id_user JOIN gestionagil_prodDB.users u ON gestionagil_prodDB.tickets.assigned_to = u.id_user JOIN gestionagil_prodDB.miningmachines ON gestionagil_prodDB.tickets.id_machine = gestionagil_prodDB.miningmachines.id_machine WHERE gestionagil_prodDB.tickets.id_ticket ='
const GET_MACHINE_BY_ID = "SELECT id_machine, status, porcentaje, id_model FROM gestionagil_prodDB.miningmachines WHERE gestionagil_prodDB.miningmachines.id_machine = ";
const UPDATE_IMAGE = 'UPDATE gestionagil_prodDB.brx_images SET url_image=(?) WHERE id_image='
const GET_URL_IMAGE = "SELECT gestionagil_prodDB.brx_images.url_image FROM gestionagil_prodDB.brx_images JOIN gestionagil_prodDB.users ON gestionagil_prodDB.brx_images.id_image = gestionagil_prodDB.users.id_image WHERE gestionagil_prodDB.brx_images.id_image = "
const GET_USERS = 'SELECT DISTINCT(gestionagil_prodDB.users.id_user), gestionagil_prodDB.users.document, gestionagil_prodDB.users.email,gestionagil_prodDB.users.status, gestionagil_prodDB.users.name, gestionagil_prodDB.users.last_name,gestionagil_prodDB.users.phone, gestionagil_prodDB.users.register, gestionagil_prodDB.users.update_data, gestionagil_prodDB.roles.description as rol , gestionagil_prodDB.roles.access FROM gestionagil_prodDB.users JOIN gestionagil_prodDB.users_roles ON gestionagil_prodDB.users.id_user = gestionagil_prodDB.users_roles.id_user JOIN gestionagil_prodDB.roles ON gestionagil_prodDB.users_roles.id_role = gestionagil_prodDB.roles.id_role WHERE gestionagil_prodDB.users.status =1 OR  gestionagil_prodDB.users.status = 0'
const GET_MINING_MACHINES = 'SELECT gestionagil_prodDB.miningmachines.speed,gestionagil_prodDB.miningmachines.revenue_day , gestionagil_prodDB.miningmachines.revenue_hour, gestionagil_prodDB.miningmachines.id_machine, gestionagil_prodDB.miningmachines.status, gestionagil_prodDB.miningmachines.porcentaje, gestionagil_prodDB.miningmachines.consume_machine, CONCAT(  gestionagil_prodDB.clients.name , " ", gestionagil_prodDB.clients.last_name ) AS name  ,gestionagil_prodDB.clients.id_client as id_client ,gestionagil_prodDB.clients.document ,gestionagil_prodDB.miningmachines.machine_name, gestionagil_prodDB.miningmachines.hashrate, gestionagil_prodDB.miningmachines.tempmax, gestionagil_prodDB.miningmachines.maxfan, gestionagil_prodDB.miningmachines.uptime, gestionagil_prodDB.miningmachines.updated_at,  gestionagil_prodDB.miningmachines.ip, gestionagil_prodDB.miningmachines.created_at, gestionagil_prodDB.miningmachines.machinedata, gestionagil_prodDB.miningmachines.historialMantenience FROM gestionagil_prodDB.miningmachines JOIN gestionagil_prodDB.clients on gestionagil_prodDB.miningmachines.document = gestionagil_prodDB.clients.document'
const ADD_ROL_TO_USER = 'INSERT INTO users_roles (id_user,id_role)  VALUES (?,?)'
const UPDATE_ROL_TO_USER = 'UPDATE users_roles SET id_role = ? WHERE id_user = ?'
const GET_ROLE_ID = 'SELECT id_role, description, status, access , sub_permissons FROM gestionagil_prodDB.roles WHERE id_role ='
const UPDATE_ROL = 'UPDATE gestionagil_prodDB.roles SET gestionagil_prodDB.roles.description = ? , gestionagil_prodDB.roles.access = ? , gestionagil_prodDB.roles.sub_permissons = ? WHERE id_role='
const TICKET_SUMMARY = 'SELECT MONTH(created_at) AS month, count(*) as cantidad  FROM tickets WHERE  YEAR(created_at) = YEAR(CURRENT_DATE()) AND MONTH(created_at) BETWEEN 1 and 12 GROUP BY MONTH(created_at) ORDER BY 1'
const MINERS_SUMMARY = 'SELECT MONTH(created_at) AS monthdate, count(*) as cantidad  FROM miningmachines WHERE  YEAR(created_at) = YEAR(CURRENT_DATE()) AND MONTH(created_at) BETWEEN 1 and 12 GROUP BY MONTH(created_at) ORDER BY 1'
//operaciones
const GET_OPERATIONS_BY_CLIENT = "SELECT * FROM operations WHERE id_client = ?"
const GET_COUNT_USER = '  '
const GET_OPETARIONS_BY_DATE = GET_OPERATIONS_BY_CLIENT + " AND created BETWEEN  ? AND ?"

const Importacion = 'SELECT impor.id_importacion, impor.id_cliente, CONCAT(  client.name , " ",client.last_name ) as client,impor.id_proveedor, impor.empresa_envio, impor.tracking_number, impor.valor_envio, impor.fecha_envio, impor.comentario_importacion, impor.articulos, impor.cantidad, impor.fecha_arribo, impor.created_at, impor.updated_at FROM gestionagil_prodDB.importaciones impor JOIN gestionagil_prodDB.clients client  ON impor.id_cliente = client.id_client '
const IMPOR_BY_ID = 'SELECT impor.id_importacion, impor.id_cliente, CONCAT(  client.name , " ",client.last_name ) as client, impor.id_proveedor, impor.empresa_envio, impor.tracking_number, impor.valor_envio, impor.fecha_envio, impor.comentario_importacion, impor.articulos, impor.cantidad, impor.fecha_arribo, impor.created_at, impor.updated_at FROM gestionagil_prodDB.importaciones impor JOIN gestionagil_prodDB.clients client  ON impor.id_cliente = client.id_client WHERE impor.id_importacion = '
const UPDATE_REVENUE = 'UPDATE gestionagil_prodDB.miningmachines SET revenue_day=?, revenue_hour=? WHERE id_machine=?'
const URL_BY_HOUR_BY_ID = 'SELECT id_machine , (CAST(amount  as float))  amount , created_at FROM gestionagil_prodDB.coinminings WHERE CAST(created_at AS DATE) = CURDATE()'
const GET_MINEROS_REVENUE_BY_ID = 'SELECT id_coinmining, id_machine, amount, created_at, updated_at, `type` FROM gestionagil_prodDB.coinminings WHERE CAST(created_at AS DATE) BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND NOW() AND id_machine = '
const GET_CONSUMO_BY_ID = 'SELECT id_consumo, id_machine, status, created_at, updated_at, consumo FROM gestionagil_prodDB.consumos WHERE CAST(created_at AS DATE) = CURDATE() AND id_machine ='

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
    TICKET_SUMMARY,
    MINERS_SUMMARY,
    GET_COUNT_USER,
    Importacion,
    IMPOR_BY_ID,
    GET_OPETARIONS_BY_DATE,
    UPDATE_REVENUE,
    URL_BY_HOUR_BY_ID,
    GET_MINEROS_REVENUE_BY_ID,
    GET_CONSUMO_BY_ID
}