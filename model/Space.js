const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spaceSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 50
    },
    size: {
        type: Number, 
        required: true, 
        min: 10, 
        max: 60
    }
})

module.exports = mongoose.model('Space', spaceSchema)