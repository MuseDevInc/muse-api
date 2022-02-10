const mongoose = require('../db/connection')


const ProfileSchema = new mongoose.Schema({
    location:{type:String},
    aboutMe:{type:String},
    favGenres:[String],
    favAlbum:{type:String, required:true},
    favArtist:{type:String, required:true},
    favSong1:{type:String},
    favSong2:{type:String},
    favSong3:{type:String},
    swipedRight:[{type:String}],
    swipedLeft:[{type:String}]


})

//User: log in info and username. Has a unique Muse with their music info


const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile