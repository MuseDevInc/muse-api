const express = require('express')
const Message = require('../models/message')
const router = express.Router()
const Messages = require('../models/message')


//add new message and save as json

router.post('/', async (req,res) => {
    const newMessage = new Message(req.body)

    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get

router.get('/:conversationId', async (req,res) => {
    try{
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        console.log(messages)
        res.status(200).json(messages)
    }
    catch(err){
        res.status(500).json(err)
    }
})




module.exports = router