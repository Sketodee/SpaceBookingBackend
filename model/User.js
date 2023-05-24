const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: Number, 
        required: true, 
    }, 
    phoneNumber: {
        type: String, 
        required: true,
    }, 
    password: {
        type: String, 
        required: true
    },
    // roles : {
    //     User: {
    //         type: Number, 
    //         default: 2001
    //     }, 
    //     Admin: Number, 
    //     Editor: Number
    // }
})

module.exports = mongoose.model('User', userSchema)