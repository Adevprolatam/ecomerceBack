const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
            unique: true
        },
        role:{
            type:["USER", "ADMIN"],
            default: "USER"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
module.exports = mongoose.model("USER", UserSchema);

