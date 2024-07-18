const express = require('express');
const http = require('http');

const app = express()
port = 8000

app.get('/', (req, res) => {
    return res.send("Hello from home")
})
app.get('/about', (req, res) => {
    return res.send("Hi" + req.query.name)
})

app.listen(port, () => {
    console.log(`Server started on port`);
});