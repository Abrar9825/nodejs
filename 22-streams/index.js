const express = require('express')
const fs = require('fs')
const zlib = require('zlib')
const status = require('express-status-monitor')
const app = express()

const port = 5000

app.use(status())
// app.get('/', (req, res) => {
//     fs.readFile("./1.txt", (err, data) => {
//         res.end(data);
//     })

// })

fs.createReadStream("./1.txt")
.pipe(zlib.createGzip()
.pipe(fs.createWriteStream('./1.zip')))

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./1.txt', 'utf-8')
    stream.on('data', (chunk) => res.write(chunk))
    stream.on('end', () => res.end())
})


app.listen(port, () => console.log(`> Server is up and running on port : http://localhost:${port}`))

