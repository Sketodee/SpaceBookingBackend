const express = require('express')
const router = express.Router()
const testController = require('../../controllers/testController')

router.route('/testing')
    .get(testController.test)


module.exports = router