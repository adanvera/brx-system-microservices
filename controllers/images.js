const multer = require("multer")
const path = require("path")
const { checkToken } = require("../helpers/verifyToken");



const getImage = (req, res) => {
    res.status(200).json({
        msg: 'Getting image'
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./sources")
    },
    filename: (req, file, cb) => {
        console.log((file));
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({ storage: storage })

const uploadImage = async (req, res) => {

    // upload.single(req.body)

    const { token } = req.headers
    console.log(`Se obtiene los siguientes datos para insertar el ticket `)
    console.log(req.body)
    if (!token) return res.status(400).json({ msg: `El token es obligatorio` })

    //verificamos el token si es valido o no ha expirado
    const isToken = await checkToken(token)
    if (!isToken) return res.status(400).json({ msg: `El token no existe o ha expirado` })

    try {
        upload.single(req.body)
        console.log("emtrodafsad");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    uploadImage,
    getImage
}