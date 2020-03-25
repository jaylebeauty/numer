const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://username:password@cluster0-jtpxd.mongodb.net/admin', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db