const { response } = require('express');
const bcryptjs = require('bcryptjs')
const { v4: uuid } = require('uuid')
const User = require('../models/user');
const Auth = require('../models/auth');

const login = async (req, res = response) => {

    //seteamos correo y contraseña
    const { email, password } = req.body;

    try {

        // Verifica si el correo existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                msg: 'Correo no valido'
            });
        }

        // Verifica si el usuario está activo
        if (user.status == 0) {
            return res.status(400).json({
                msg: 'Usuario bloqueado',
                errorCode: 1002
            });
        }

        // Verifica la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña no valido'
            });
        }

        // Generar el JWT
        const token = uuid()
        console.log(token);
        const auth = await Auth.create({ id_user: user.id_user, token: token, created: new Date() })
        console.log(auth);
        delete user.dataValues.password
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login,
}
