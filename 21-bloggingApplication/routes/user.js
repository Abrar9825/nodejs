const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        await User.create({ fullname, email, password })
        return res.redirect("/")
    } catch (error) {
        // Handle error, e.g., render signup with error messages
        return res.status(500).send(error.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await User.matchPasswordGenrateToken(email, password)
        console.log("token", token)
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect Email or password"
        });
    }
})

module.exports = router
