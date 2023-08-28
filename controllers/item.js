const {itemModel} = require('../models/index');
const http = require('http');
const socketIO = require('socket.io');


let io;

const setSocketIO = (server) => {
    io = socketIO(server);
};

const emitNewItem = (data) => {
    io.emit('newItem', data);
};


const getItemsAll = async (req,res)=>{
    const {body} = req;
    const data = await itemModel.find().populate("createdBy",'name email')
    res.json({
        code:"200",
        ok:true,
        items:data
    });
}

const createItem = async (req,res)=>{
    const {body} = req;
    const data = await itemModel.create(body);
    
    const generatedHTML = `<div>Nuevo producto creado: ${data.name}</div>`;

    // Emitir el evento 'newItem' a todos los clientes conectados
    emitNewItem({ item: data, generatedHTML });

    console.log(emitNewItem);
    res.json({
        code:"200",
        ok:true,
        item:data
    })
}

module.exports = {
    createItem, 
    getItemsAll,
    setSocketIO,
}