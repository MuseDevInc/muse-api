const mongoose = require('../db/connection')


const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
    },
    sender:{
        type:String,
    },
    text:{type:String},

//10:08
},{timestamps:true})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message