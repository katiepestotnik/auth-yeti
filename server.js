require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT
const methodOverride = require('method-override')
const userController = require('./controllers/users')
const sessionsController = require('./controllers/sessions')


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (err)=>console.log(err))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', ()=>console.log('mongo disconnected'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
)
app.use(methodOverride('_method'))
//routers middleware  
app.use('/sessions', sessionsController)
app.use('/users', userController)


app.get("/", (req, res) => {
    if (req.session.currentUser) {
      res.render("dashboard.ejs", {
        currentUser: req.session.currentUser,
      })
    } else {
      res.render("index.ejs", {
        currentUser: req.session.currentUser,
      })
    }
  })


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})