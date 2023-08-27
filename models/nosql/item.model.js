const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        nameProduct:{
            type:String,
        },
        value:{
            type:Number,
            default: 0
        },
        description:{
            type:String,
            default: "No description"
        },
        images:{
            type:Object,
        },
        banner:{
            type:String,
        },
        visibility:{
            type:Boolean,
            default:true
        },
        createdBy:{
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        category:{
            type:String,
        },
        stock:{
            type:Number,
            required:true
        },
        nventas:{
            type:Number,
            default:0,
            required:false
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
module.exports = mongoose.model("items", ItemSchema);

