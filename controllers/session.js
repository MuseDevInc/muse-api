const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')

//LOG IN
router.post('/login', async (req,res,next) => {
    //Check if user exists, if so then check if password correct.
    try {
        //Check if user exists
        const userToLogin = await User.findOne({username: req.body.username})
        //  validate password if user exists
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.username = userToLogin.username
                req.session.loggedIn = true
                req.session.userId = userToLogin._id
                return res.status(200).json({message: "Successfully Signed In: " + userToLogin.username, status: 200, currentUsername: userToLogin.username, currentUserId: req.session.userId})
            }
            else {
                //if invalid password
                return res.status(400).json({message: "Invalid Password", status: 400})
            }
        }
        else {
            //if no user exists
            console.log('Expected output, no user exists!')
            return res.status(400).json({message: "Invalid Username of Password", status: 400})
        }
    } catch (err) {
        next(err)
    }
})

//REGISTER
router.post('/register', async (req,res,next) => {
    //Check if passwords match and if username is taken. If not, create user.
    try {
        if (req.body.password === req.body.verifyPassword){
            const desiredUsername = req.body.username
            const userExists = await User.findOne({ username: desiredUsername})
            if (userExists){
                //if no user exists
                return res.status(400).json({message: "Username already taken", status: 400})
            }
            else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                req.session.userId = createdUser._id
                return res.status(200).json({message: "Successfully Signed up",status: 200,currentUsername: createdUser.username, currentUserId: req.session.userId})
            }
        }
        else {
            return res.status(400).json({message:"Passwords must match"})
                }
    } catch (err) {
        next(err)
    }
})

//LOG OUT
router.get('/logout', (req,res) => {
    req.session.destroy( err => {
        if(err) {
            return res.status(400).json({message: err.message})
        } else {
            return res.status(200).json({message: "Signed out successfuly"})
        }
    })
})


module.exports = router