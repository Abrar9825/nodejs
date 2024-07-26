const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 5000;

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'));

app.get('/', (req, res) => {
    return res.render('index');
});

app.post('/upload', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: '2profileImage', maxCount: 1 }
]), (req, res) => {
    // Check if files were uploaded
    if (!req.files || (!req.files['profileImage'] && !req.files['2profileImage'])) {
        return res.status(400).send('No files uploaded.');
    }

    console.log(req.body);
    console.log(req.files);

    return res.redirect('/');
});

app.listen(port, () => console.log(`> Server is up and running on port : http://localhost:${port}`));
