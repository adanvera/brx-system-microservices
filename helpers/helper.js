const User = require("../models/user");

const getUserById = async (id_user, res) => {
    try {


        console.log(id_user);

        if (!id_user) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({ where: { id_user } });

        if (!user) return res.status(400).json({ msg: `Usuario con id ${id_user} no existe` });
        delete user.dataValues.password
        res.json(user);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserById
}