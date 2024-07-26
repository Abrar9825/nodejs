const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const translate = require('@vitalets/google-translate-api').default;

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server);

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// socket.io
io.on('connection', (socket) => {
    socket.on("userMessage", (message) => {
        io.emit("msg", message);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/speechtranslator', async (req, res) => {
    const { speech, language } = req.body;

    try {
        const response = await translate(speech, { to: language });
        res.json({ translatedText: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

server.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
