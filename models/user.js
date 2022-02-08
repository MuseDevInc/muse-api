const mongoose = require('../db/connection')


const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phoneNumber:{type:String},


})


const User = mongoose.model("User", UserSchema)

module.exports = User