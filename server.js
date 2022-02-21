require('dotenv').config()
const express = require('express')
const app = express()
app.set('port', process.env.PORT || 4000)
const SESSION_SECRET = process.env.SESSION_SECRET
const cors = require('cors');
// const methodOverride = require('method-override')
const session = require('express-session')
const museController = require('./controllers/muse')
const sessionController = require('./controllers/session')
const conversationController = require('./controllers/conversations')
const messageController = require('./controllers/messages')
const spotifyPingController = require('./controllers/spotifyPing')

const corsOptions = {
    origin: ['http://localhost:3000','https://muse-dev.herokuapp.com','https://muse-dev.herokuapp.com/*'],
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))

//MIDDLEWARE

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}))

// app.use(express.static('public'))

//Make username available on all pages
app.use((req,res,next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    res.locals.userId = req.session.userId
    next()
})
// //flash messaging
app.use((req,res,next) => {
    res.locals.message = req.session.message
    
    //Reset message to blank string
    req.session.message = ""

    next()
})
//middleware for actions that require auth
const authRequired = (req,res,next) => {
    if (req.session.loggedIn) {
        next()
    }
    else {
        res.redirect('/session/login')
    }
}

app.use('/session', sessionController)
app.use('/muse', museController)
app.use('/conversation', conversationController)
app.use('/message', messageController)
app.use('/spot', spotifyPingController)

app.listen(app.get('port') , () => {
    console.log(`Working on port: ${app.get('port')}`)
})