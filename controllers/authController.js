const  User = require ('../model/User')
const validator = require ('../config/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async(req, res) => {
    const users = await User.find();
  if(!users) return res.sendStatus(204)
    res.json(users)
}

const register = async (req, res) => {
    const {error, value} = validator.validateUser(req.body)

    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    //check database if user exist
    const duplicate = await User.findOne({email : value.email}).exec()
    if(duplicate) {
        return res.status(409).json({'message': 'User already exists'})
    }

    try {
        //encrypt the password 
        const hashedPassword = await bcrypt.hash(value.password, 10)

        //create and store the new user in the database 
        const result = await User.create({
            "name": value.name, 
            "email": value.email, 
            "phoneNumber": value.phoneNumber, 
            "password": hashedPassword
        })
        res.status(201).json({'message' : 'User created successfully'})
        console.log(result)
    } catch (error) {
        return res.status(500).json({'message' : error.message})
    }
}

const login = async( req, res) => {
    const {error, value} = validator.validateLogin(req.body)
    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    //check database if user exists
    const foundUser = await User.findOne({email: value.email}).exec()
    if(!foundUser)  return res.status(400).json({'message': 'User not found'}) 

    //evaluate password
    const match = await bcrypt.compare(value.password, foundUser?.password)
    if(match) {
        //grab the user roles (their values only)
        const roles = Object.values(foundUser.roles)

        //create JWT
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                        "email": foundUser.email, 
                        "id" : foundUser._id, 
                        "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {'expiresIn' : '300s'}
        );

        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {'expiresIn' : '1d'}
        );

        //Save refresh token to the current user and update the DB
       foundUser.refreshToken = refreshToken
       const result = await foundUser.save(); 
        
        //send token as a cookie 
         //when using thunder client, remove samesite and secure, because the cookies won't clear on logout if they still remain there
        res.cookie('jwt', refreshToken, {httpOnly: true,  sameSite: 'None', secure: true, maxAge: 24 * 60 * 60* 1000})
        console.log(accessToken)
        res.json({'success' : ` User ${foundUser.name} is logged in`, 'accessToken' : accessToken})
     }
     else {
        res.status(401).json({'message': 'Invalid Credentials'}) //Unauthorized
     }

}

module.exports = {
    register, 
    login, 
    getAllUsers
}