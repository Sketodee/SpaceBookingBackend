const express = require('express')
const router = express.Router()
const bookingController = require ('../../controllers/bookingController')
const ROLES_LIST= require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/getallbookings')
    .get(bookingController.getAllBookings)

router.route('/createnewbooking')
    .post(verifyRoles(ROLES_LIST.User), bookingController.createNewBooking)

router.route('/approvebooking')
    .post(verifyRoles(ROLES_LIST.SystemAdmin), bookingController.approveBooking)

router.route('/declinebooking')
    .post(verifyRoles(ROLES_LIST.SystemAdmin), bookingController.declineBooking)

module.exports = router
