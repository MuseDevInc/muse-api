require('dotenv').config()
const mongoose = require('./connection')
const Profile = require('../models/profile')
const profileSeeds = require('./seedData.json')

Profile.deleteMany({})
.then(() => {
    return Profile.insertMany(profileSeeds)
})
.then(data => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
})
.finally(()=> {
    process.exit()
})