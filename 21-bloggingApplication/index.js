const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const app = express()

// middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 5000

mongoose.connect('mongodb://localhost:27017/blogify').then(() => { console.log("connected"); })

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/user', userRoute)

app.listen(port, () => console.log('> Server is up and running on port : ' + port))