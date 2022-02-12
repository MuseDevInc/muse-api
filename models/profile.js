const mongoose = require('../db/connection')


const ProfileSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    location:{type:String},
    aboutMe:{type:String},
    favGenres:[String],
    favAlbum:{type:String},
    favArtist:{type:String},
    favSongs: [{
        title: String,
        uri: String,
        artist: String,
        albumUrl: String

    }],
    swipedRight:[{type:String}],
    swipedLeft:[{type:String}]


})

//User: log in info and username. Has a unique Muse with their music info


const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile