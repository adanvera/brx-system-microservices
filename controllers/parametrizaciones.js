const Parametrizacione = require("../models/parametrizacione");


const addParams = async (req,res)=>{
    try {
        
        const param= await Parametrizacione.create(req.body)
        if(!param) return res.json({msg:'No se pudo guardar el parametro'})

        res.json({
            param
        })

    } catch (error) {
        console.log(error);
        res.json({msg:'Ocurrio un error'})
    }
    
}

const getAllParams = async (req,res)=>{
    try {
        
        const params = await Parametrizacione.findAll({})

        if(!params) return res.json({msg:'Error al obtener'})
        res.json({
            params
        })
    } catch (error) {
        console.log(error);
        res.json({msg:'error inesperado'})
    }
}

const updateParams = async (req,res) =>{
    try {
        const {codigo} =req.params
        const param = await Parametrizacione.update(req.body,{where:{codigo}})
    
        if(!param) return res.json({msg:'Ocurrio un error al crear'})

        res.status(200).json({
            msg:'Acutalizacion correcta'
        })
        
    } catch (error) {
        res.json({msg:'Error inesperado'})
    }


}

module.exports ={
    addParams,
    getAllParams,
    updateParams
}