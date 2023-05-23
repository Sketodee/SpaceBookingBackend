const express = require ('express')
const router = express.Router()
const spaceController = require('../../controllers/spaceController')

router.route('/getallspace')
    .get(spaceController.getAllSpaces)

router.route('/createnewspace')
    .post(spaceController.createNewSpace)

module.exports = router 

