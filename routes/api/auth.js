const express = require ('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/register')
    .post(authController.register)

router.route('/login')
    .post(authController.login)

router.route('/getallusers') 
    .get(authController.getAllUsers)


module.exports = router