const User = require("../models/user");

const gettingUseData = async (id_user) => {
    try {
        console.log("iniciamos consulta de usuario");
        if (!id_user) return res.status(400).json({ msg: `Se requiere el id del usuario` });
        const user = await User.findOne({ where: { id_user: id_user} });
        return (user.dataValues)
        
    } catch (error) {
        return console.log(error);
    }
}

module.exports = {
    gettingUseData
}