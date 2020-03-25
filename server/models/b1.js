const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BisectionDB = new Schema(
    {
        xl:{type: Number, required: false},
        xr:{type: Number, required: false},
        fx:{type: String, required: true}
    }
)
module.exports = mongoose.model('bisections',BisectionDB)