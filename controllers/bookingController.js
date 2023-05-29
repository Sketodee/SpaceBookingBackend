const Booking = require ('../model/Booking')
const BookedDate = require('../model/BookedDate')
const Space = require('../model/Space')
const validator = require('../config/validator')
const { Schema } = require('mongoose')

const getAllBookings = async (req, res) => {
    //check the roles of the user, if system admin, return all bookings , else return booking that corresponds to user 
    const bookings = req.roles.includes(1759) ? await Booking.find().populate('bookedDates') : await Booking.find({userId: req.id}).populate('bookedDates')
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

const approveBooking = async(req, res) => {
    var bookingId = req?.query?.bookingId
    if(!bookingId) {
        return res.status(400).json({'message': 'bookingId parameter is required' })
    }

    try {
        //check if booking exists in database
        const booking =await Booking.findById(bookingId);

        if(!booking) return res.status(400).json({'message': 'Booking not found'}) 

        //change the state of the booking 
        booking.bookingStatus = "Approved"
        const result = await booking.save()
        console.log(result)

        res.status(200).json({'message' : 'Booking approved successfully'})
        
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid bookingID format' });
          }
        console.log(error)
        return res.status(400).json({'message': 'Booking not found'}) 
    }
}

const declineBooking = async (req, res) => {
    var bookingId = req?.query?.bookingId
    if(!bookingId) {
        return res.status(400).json({'message': 'bookingId parameter is required' })
    }

    try {
        //check if booking exists in database
        const booking =await Booking.findById(bookingId);

        if(!booking) return res.status(400).json({'message': 'Booking not found'}) 

        //change the state of the booking 
        booking.bookingStatus = "Declined"
        const result = await booking.save()
        console.log(result)

        res.status(200).json({'message' : 'Booking approved successfully'})
        
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid bookingID format' });
          }
        console.log(error)
        return res.status(400).json({'message': 'Booking not found'}) 
    }
    console.log(bookingId)
    // res.status(200).json({'message': 'endpoint working'})
}

module.exports = {
    getAllBookings, 
    createNewBooking, 
    approveBooking, 
    declineBooking
}