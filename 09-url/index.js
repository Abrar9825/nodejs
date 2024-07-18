const fs = require('fs')
const http = require('http')
const url = require('url')
// npm i url
http.createServer((req, res) => {
    // remove facicom which is by defult by google
    if (req.url === '/favicon.ico') {
        return res.end()
    }

    const log = `${Date.now()} ${req.url} new Request recvied \n`
    const myUrl = url.parse(req.url, true)//true for parse parameter string
    console.log(myUrl);

    fs.appendFile('1.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end('Home page')
                break;

            case '/about':
                const username = myUrl.query.myname
                res.end(`Hi ,${username}`)
                break;

            default:
                res.end("Nothing")
                break;
        }
    })
}).listen(8000, (err, res) => {
    console.log("Started");
})