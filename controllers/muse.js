const express = require('express')
const router = express.Router()
const Muse = require('../models/muse')
const User = require('../models/user')

//USER PAGE

router.get('/userPage', (req,res) => {
    User.find({}, (error,user) => {
        if (error) {
            res.status(400).json({ error: error.message })
            next()
        }
        //return user as json
        res.status(200).json(user)
    })
})
// Page where User who has signed up creates their profile. This is not a register page.
router.post('/userCreationPage', (req,res) => {
    Muse.create(req.body, (error, createdMuse) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          //return "Muse" info 
          res.status(200).json(createdMuse)
    })
})

//Show individual user page, (Maybe not Muse?)
router.get('/:id', (req,res) => {
    Muse.findById(req.params.id, (error,muse) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          //return specifc "Muse" by id
          res.status(200).json(muse)
    }) 
})

//Delete route

router.delete('/:id', (req,res) => {
    Muse.findByIdAndDelete(req.params.id, (error, muse) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          res.status(200).json(muse)
    })
})

//Update route

router.put('/:id', (req,res) => {
    Muse.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedMuse) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          res.status(200).json(updatedMuse)
    })
})

module.exports = router