const express = require('express')
const fs = require('fs')

const userRouter = require('./routes/user')

const { connectionMongodb } = require('./connection')

const { logreqres } = require('./middelwares')

const app = express()
port = 8000

//middelwares
app.use(express.urlencoded({ extended: false }))
app.use(logreqres('log.txt'))

// connection
connectionMongodb('mongodb://localhost:27017/newdata').then(() => { console.log("Mongodb connected"); }).catch(() => {
    console.log("Error doing a connection");
})



// routes

app.use('/api/user', userRouter)
app.listen(port, () => {
    console.log(`This Server is http://localhost:${port}`);
})