const express = require('express');
const urlroute = require('./routes/url')
const { connectmongodb } = require('./connect')
const URL = require('./models/url')

const app = express()
const port = 8001

app.use(express.json())//middelware

connectmongodb("mongodb://localhost:27017/newmove").then(() => {
    console.log("Mongodb Connected");
})
    .catch(() => {
        console.log("Error Doing a connection");
    })

app.use("/url", urlroute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        }
    )
    res.redirect(entry.redirectURL);
})

app.listen(port, () => {
    console.log(`Server started on http://localhost${port}`);
});
