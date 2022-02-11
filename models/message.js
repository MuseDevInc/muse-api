const mongoose = require('../db/connection')


const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
    },
    sender:{
        type:String,
    },
    text:{type:String},


})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message