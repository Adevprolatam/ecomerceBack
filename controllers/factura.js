const {facturaModel} = require('../models/index');


const getFactoryAll = async (req,res)=>{
    const {body} = req;
    const data = await facturaModel.find()
        .populate("cliente",'name email')
        .populate("items",'nameProduct value category')
    res.json({
        code:"200",
        ok:true,
        facturas:data
    })
}

const createFactura = async (req,res)=>{
    const {body} = req;
    const data = await facturaModel.create(body);
    res.json({
        code:"200",
        ok:true,
        factura:data
    })
}

module.exports = {
    createFactura, 
    getFactoryAll
}