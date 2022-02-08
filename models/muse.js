const mongoose = require('../db/connection')


const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number},
    sex:{type:String},
    favArtist:{type:String, required:true},
    favSong1:{type:String},
    favSong2:{type:String},
    favSong3:{type:String},


})


const User = mongoose.model("User", UserSchema)

module.exports = User