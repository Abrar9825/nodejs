const express = require('express')
var mongoose = require('mongoose');
const fs = require('fs')

const app = express()
port = 8000
app.use(express.urlencoded({ extended: false }))
mongoose.connect("mongodb://localhost:27017/newdata")
    .then(() => { console.log("Connected"); })
    .catch(() => { console.log("Error doing conncet database"); })



app.post("/api/user", async (req, res) => {
    // Create New User
    const body = req.body
    const result = await User.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,
    });
    return res.status(201).json({ msg: "sussces" })
})

app.listen(port, () => {
    console.log(`This Server is http://localhost:${port}`);
})