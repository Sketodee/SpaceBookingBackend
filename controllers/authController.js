const User = require('../model/User')
const validator = require ('../config/validator')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const {error} = validator.validateUser(req.body)
    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    //check for duplicate email in the database 
    // const duplicate = await User.findOne({email : req.body.email}).exec()

    // if(duplicate) {
    //     return res.status(409).json({'message' : 'User already exist'})
    // }

    res.status(200).json({'message': 'i am working'})

}

module.exports = {register}