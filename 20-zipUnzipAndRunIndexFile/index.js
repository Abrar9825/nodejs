const express = require('express');
const multer = require('multer');
const AdmZip = require('adm-zip');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

const uploadDir = 'uploads';
const extractDir = path.join(uploadDir, 'extracted');

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Create 'extracted' directory if it doesn't exist
if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir);
}

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for uploading ZIP file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(uploadDir, req.file.filename);

    // Check if the file exists before trying to unzip
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return res.status(404).send('File not found.');
    }

    // Unzip the file
    try {
        const zip = new AdmZip(filePath);
        zip.extractAllTo(extractDir, true);

        // Path to the index.js file
        const indexPath = path.join(extractDir, 'index.js');

    } catch (err) {
        console.error(`Error unzipping file: ${err.message}`);
        res.status(500).send('Error unzipping file.');
    }
    return res.redirect('/')
});

// Route to render the upload form using EJS
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log('> Server is up and running on port : ' + port);
});
