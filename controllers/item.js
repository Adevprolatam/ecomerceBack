const {itemModel} = require('../models/index');


const getItemsAll = async (req,res)=>{
    const {body} = req;
    const data = await itemModel.find().populate("createdBy",'name email')
    res.json({
        code:"200",
        ok:true,
        items:data
    })
}

const createItem = async (req,res)=>{
    const {body} = req;
    const data = await itemModel.create(body);
    res.json({
        code:"200",
        ok:true,
        item:data
    })
}

module.exports = {
    createItem, 
    getItemsAll
}