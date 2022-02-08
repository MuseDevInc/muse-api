const express = require('express')
const router = express.Router()
const Muse = require('../models/muse')

//Home

router.get('/', (req,res) => {
    res.render('home',)
})










module.exports = router