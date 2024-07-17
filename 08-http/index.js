const http = require('http')
const fs = require('fs')
port = 8000

http.createServer((req, res) => {
    const log = `${Date.now()} ${req.url}: new Request recived\n`
    fs.appendFile("log.txt", log, (err) => {

        switch (req.url) {
            case "/":
                res.end("This is Home")
                break;
            case "/about":
                res.end("This is about")
                break;
        
            default:
                res.end("This is Wrong")
                break;
        }
    })
}).listen(8000, () => {
    console.log("Server is runnging");
})