const mongoose = require('../db/connection')


const ConversationSchema = new mongoose.Schema({
    members:[]
})

const Conversation = mongoose.model("Conversation", ConversationSchema)

module.exports = Conversation