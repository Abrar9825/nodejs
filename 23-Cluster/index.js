const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.status(200).json({ msg: `hello from simple server :)${process.pid} ` })
})


app.listen(port, () => console.log('> Server is up and running on port : ' + port))