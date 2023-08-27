const {userModel} = require('../models/index');


const getUserAll = async (req,res)=>{
    const {body} = req;
    const data = await userModel.find({});
}

const createUser = async (req,res)=>{
    const {body} = req;
    const data = await userModel.create(body);
}

module.exports = {
    createUser, 
    getUserAll
}