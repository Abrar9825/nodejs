const mongoose = require('mongoose')
async function connectionMongodb(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectionMongodb
}