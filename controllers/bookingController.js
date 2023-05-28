const Booking = require ('../model/Booking')
const Space = require('../model/Space')
const validator = require('../config/validator')
const { Schema } = require('mongoose')

const getAllBookings = async (req, res) => {
    const bookings = await Booking.find()
    if(!bookings) return res.sendStatus(204)
    res.json(bookings)
}

const createNewBooking = async (req, res) => {
    const {error, value} = validator.validateBooking(req.body)
    
    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    //check if space exists
    try {
        const space = await Space.findById(value.spaceId)
        console.log(space)
    } catch (error) {
        console.log(error)
    }

    res.json({'message': 'working'})
}

module.exports = {
    getAllBookings, 
    createNewBooking
}