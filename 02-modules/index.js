const http = require('http')
const date = require('./date.js')

http.createServer(function (req, res) {
    res.writeHead(200, ({ 'Content-type': 'text/html' }))
    res.end("Hello World A data is " + date.dt())
}).listen(9080)