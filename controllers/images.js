const multer = require('multer')
const sequelize = require("../database/db");
const { INSERT_IMAGE, UPDATE_IMAGE } = require("../helpers/querys");
const { checkToken } = require("../helpers/verifyToken");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'sources')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },

})

const upload = multer({ storage: storage })

exports.upload = upload.single('image')

exports.uploadFile = async (req, res) => {
    const { token } = req.headers
    const url_image = req.file.filename

    try {
        console.log(`Se obtiene los siguientes datos para insertar la imagen `)
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` })
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        const [results, metadata] = await sequelize.query(
            INSERT_IMAGE, {
            replacements: [url_image]
        });
        res.json({ msg: 'Se ha insertado la imagen correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


exports.updateImage = async (req, res) => {
    const { token } = req.headers
    const url_image = req.file.filename
    const { id: id_image } = req.params

    try {
        console.log(`Se obtiene los siguientes datos para reemplazar la imagen `)
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` })
        //verificamos el token si es valido o no ha expirado
        const isToken = await checkToken(token)
        const [results, metadata] = await sequelize.query(
            UPDATE_IMAGE + id_image, {
            replacements: [url_image]
        });
        res.json({ msg: 'Se actualiza exitosamente la imagen' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
