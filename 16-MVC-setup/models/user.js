const express = require('express');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },

    job_title: {
        type: String,
    },
    gender: {
        type: String,
    },

},
    {
        timestamps: true//to get a time 
    }
)
const User = mongoose.model('user', userSchema)

module.exports = User;