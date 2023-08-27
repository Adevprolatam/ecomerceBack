const mongoose = require("mongoose");

const UserSchema = {
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
}
module.exports = mongoose.Model("USER", UserSchema);

