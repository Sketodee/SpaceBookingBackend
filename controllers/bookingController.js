const Booking = require ('../model/Booking')
const BookedDate = require('../model/BookedDate')
const Space = require('../model/Space')
const validator = require('../config/validator')
const { Schema } = require('mongoose')

const getAllBookings = async (req, res) => {
    const bookings = await Booking.find().populate('bookedDates')
    if(!bookings) return res.sendStatus(204)
    res.json(bookings)
}

const createNewBooking = async (req, res) => {
    const {error, value} = validator.validateBooking(req.body)
    
    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    try {
        //check if space exists
        const space = await Space.findById(value.spaceId)
        if(!space) return res.status(400).json({'message': 'Space not found'}) 

        //check if the  number of guests isn't more than space size 
        if(value.numberOfGuests > space.size) return  res.status(400).json({'message': `This space can only take ${space.size} guests`}) 

        //add booked dates
        const createdBookedDates = await BookedDate.create(value.bookedDates)

        //create a new booking 
        const newBooking = new Booking({
            ... value, 
            userId: req.id,
            bookedDates: createdBookedDates.map(date => date._id)
        })

        await newBooking.save();
        res.status(201).json({'message' : 'Booking created successfully'})
        
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid space ID format' });
          }
        console.log(error)
        return res.status(400).json({'message': 'Space not found'}) 
    }
}

module.exports = {
    getAllBookings, 
    createNewBooking
}