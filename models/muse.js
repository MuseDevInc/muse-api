const mongoose = require('../db/connection')


const MuseSchema = new mongoose.Schema({
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


const Muse = mongoose.model("Muse", MuseSchema)

module.exports = Muse