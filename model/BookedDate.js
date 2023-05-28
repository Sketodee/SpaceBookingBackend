const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookedDateSchema = new Schema({
    date: {
        type: Date, 
        required: true
    }
})

module.exports = mongoose.model('BookedDate', bookedDateSchema)