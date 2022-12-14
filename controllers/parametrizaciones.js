const Parametrizacione = require("../models/parametrizacione");


const addParams = async (req, res) => {
    try {

        const param = await Parametrizacione.create(req.body)
        if (!param) return res.json({ msg: 'No se pudo guardar el parametro' })

        res.json({
            param
        })

    } catch (error) {
        console.log(error);
        res.json({ msg: 'Ocurrio un error' })
    }

}

const getAllParams = async (req, res) => {
    try {
        const results = await Parametrizacione.findAll()
        res.json(results)
        console.log('Obtenemos los siguientes datos');
        console.log(results)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const updateParams = async (req, res) => {
    try {
        const { codigo } = req.params
        const param = await Parametrizacione.update(req.body, { where: { codigo } })

        if (!param) return res.json({ msg: 'Ocurrio un error al crear' })

        res.status(200).json({
            msg: 'Acutalizacion correcta'
        })

    } catch (error) {
        res.json({ msg: 'Error inesperado' })
    }


}

const deleteParam = async (req, res) => {
    const { codigo } = req.params
    try {
        const param = await Parametrizacione.destroy({ where: { codigo } })
        if (!param) return res.json({ msg: 'Ocurrio un error al eliminar' })
        res.status(200).json({
            msg: 'Eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error inesperado'
        })
    }
}
const getParamByCodigo = async ( req,res )=>{
    const {codigo} = req.params
    const param = await Parametrizacione.findOne({where:{codigo}})
    if(!param) return res.json({msg:'No exite parametro con codigo'+codigo})
    res.json({
        param
    })
}

module.exports = {
    addParams,
    getAllParams,
    updateParams,
    deleteParam,
    getParamByCodigo
}