const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spaceSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    size: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('Space', spaceSchema)