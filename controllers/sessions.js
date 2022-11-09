// Dependencies
const express = require("express")
const bcrypt = require("bcrypt")
const sessionsRouter = express.Router()
const User = require("../models/user.js")

// New (login page)
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})
// Delete (logout route)
sessionsRouter.delete('/', (req, res) => {
    console.log(req.session)
    req.session.destroy((err) => {
        res.redirect('/')
    })
})
// Create (login route)
sessionsRouter.post('/', (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (!foundUser) {
            res.send('User doesn\'t exist')
        } else {
            //compare the password to db
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password)
            //console.log(passwordMatches)
            if (passwordMatches) {
                // add the user to our session
                console.log(req.session)
                console.log(req.session.currentUser)
                req.session.currentUser = foundUser
                console.log(req.session.currentUser)
      
                // redirect back to our home page
                res.redirect("/")
            } else {
                res.send('Invalid password')
            }
        }
    })
})

// Export Sessions Router
module.exports = sessionsRouter