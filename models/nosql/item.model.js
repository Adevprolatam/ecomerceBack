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
        images:{
            type:String,
        },
        banner:{
            type:String,
        },
        visibility:{
            type:Boolean,
            default:true
        },
        createdBy:{
            type: Schema.Types.ObjectId,
            ref: 'USER',
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
module.exports = mongoose.model("ITEM", ItemSchema);

