const Client = require("../models/client");
const User = require("../models/user");

const gettingUseData = async (id_user) => {
    try {
        console.log("iniciamos consulta de usuario");
        if (!id_user) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({ where: { id_user: id_user } });
        return (user.dataValues)

    } catch (error) {
        return console.log(error);
    }
}

const gettingClientByDocuemnt = async (document) => {
    try {
        console.log("iniciamos consulta de usuario");
        if (!document) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const client = await Client.findOne({ where: { document: document } });
        return (client.dataValues)
    } catch (error) {
        return console.log(error);
    }
}

const gettingClientById = async (id_client) => {
    try {
        console.log("iniciamos consulta de usuario");
        if (!id_client) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const client = await Client.findOne({ where: { id_client: id_client } });
        return (client.dataValues)
    } catch (error) {
        return console.log(error);
    }
}

module.exports = {
    gettingUseData,
    gettingClientByDocuemnt,
    gettingClientById
}