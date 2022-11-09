const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    })
})

//new (registration page)
//create (registration route)
userRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, user) => {
        res.redirect('/sessions/new')
    })
})

module.exports = userRouter