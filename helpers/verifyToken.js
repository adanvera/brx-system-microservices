const Auth = require("../models/auth");

const checkToken = async (token, idUser = []) => {
    const tokenExist = await Auth.findOne({ where: { token } });
    if (!tokenExist) return false;
    console.log('Token existe verificamos si no ha expirado');
    console.log(tokenExist.created);
    const date = new Date();
    console.log("fecha de hoy"+(date.toISOString().split('T')[0]));
    if (tokenExist.created !== (date.toISOString().split('T')[0])) return false
    console.log('EL token es valido');
    console.log(tokenExist);
    idUser.push (tokenExist.dataValues.id_user) 
    console.log('Valor del idUser: '+idUser[0]);

    return true

}

module.exports = { checkToken }