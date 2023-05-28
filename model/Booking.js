const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    spaceId : {
        type: Schema.Types.ObjectId ,
        required: true
    }, 
    userId : {
        type: Schema.Types.ObjectId
    }, 
    numberOfGuests: {
        type: Number, 
        required: true
    }, 
    decorations: {
        type: Boolean, 
        required: true
    }, 
    eventType : {
        type: String, 
        required: true
    }, 
    feedingRequirement: {
        type: String , 
        required: true
    }, 
    musicPolicy:{
        type: Boolean, 
        required: true,
    }, 
    bookingStatus: {
        type: String, 
        enum: ['Pending', 'Approved', 'Declined'],
        required: true, 
        default: 'Pending'
    }, 
    bookedDates: [
        { type: Schema.Types.ObjectId, ref: 'BookedDate' }
    ]
})

module.exports = mongoose.model('Booking', bookingSchema)