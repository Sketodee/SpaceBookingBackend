const express = require('express')
const router = express.Router()
const bookingController = require ('../../controllers/bookingController')

router.route('/getallbookings')
    .get(bookingController.getAllBookings)

router.route('/createnewbooking')
    .post(bookingController.createNewBooking)

module.exports = router
