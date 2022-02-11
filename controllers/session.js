const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')

//LOG IN
router.post('/login', async (req,res,next) => {
    //Check if user exists, if so then check if password correct.
    try {
        //Check if user exists, if 
        const userToLogin = await User.findOne({username: req.body.username})
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.username = userToLogin.username
                req.session.loggedIn = true
                req.session.userId = userToLogin._id
                console.log('Logged in as ', userToLogin.username)
                res.redirect('/muse')
            }
            else {
                //if invalid password
                req.session.message = "Invalid username or password"
                res.redirect('/session/login')
            }
        }
        else {
            //if no user exists
            console.log('Expected output, no user exists!')
            req.session.message = "Invalid username or password"
            res.redirect('/session/login')
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
                req.session.message = "Username already taken"
            res.redirect('/session/register')
            }
            else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                req.session.userId = createdUser._id
                res.redirect('/muse')
                console.log(createdUser)
                console.log('Expected person')
            }
        }
        else {
            req.session.message = "Passwords must match"
        }
    } catch (err) {
        next(err)
    }
})

//LOG OUT
router.get('/logout', (req,res) => {
    req.session.destroy()
    res.redirect('/session/login')
})


module.exports = router