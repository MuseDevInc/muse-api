const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
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
//SPECIFIC USER PAGE

router.get('/userPage/:id', (req,res) => {
    User.findById((req.params.id), (error, user) => {
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
    Profile.create(req.body, (error, createdProfile) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          //return "Profile" info 
          res.status(200).json(createdProfile)
    })
})

//Show individual user page, (Maybe not Profile?)
router.get('/:id', (req,res) => {
        Profile.findById(req.params.id, (error,profile) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          //return specifc "Profile" by id
          res.status(200).json(profile)
    }) 
})
//
//Delete route
//hello
router.delete('/:id', (req,res) => {
        Profile.findByIdAndDelete(req.params.id, (error, profile) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          res.status(200).json(profile)
    })
})

//Update route

router.put('/:id', (req,res) => {
        Profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedProfile) => {
        if (error) {
            res.status(400).json({ error: error.message })
          }
          res.status(200).json(updatedProfile)
    })
})

module.exports = router