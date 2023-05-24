const Joi = require('joi')

const validateSpace = (space) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        size: Joi.number().integer().min(10).max(60).required()
    })

    return schema.validate(space, {abortEarly: false})
}

const validateUser= (user) => {
    const userDtoSchema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be empty'
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }), 
        phoneNumber: Joi.string().pattern(/^[0-9]+$/).required().messages({
            'any.required': 'Phone number is required',
            'string.empty': 'Phone number cannot be empty',
            'string.pattern.base': 'Phone number must contain only digits'
        }), 
        password: Joi.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty'
        }), 
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.required': 'Confirm password is required',
            'string.empty': 'Confirm password cannot be empty',
            'any.only': 'Passwords must match'
        }), 
        roles: Joi.object().keys({
            User: Joi.number().default(2001),
            Admin: Joi.number(),
            Editor: Joi.number()
          })
    })

    return userDtoSchema.validate(user, {abortEarly: false})
}

const validateLogin = (loginDetails) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }), 
        password: Joi.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty'
        })
    })

    return loginSchema.validate(loginDetails,{abortEarly: false})
}

module.exports = {
    validateSpace, 
    validateUser, 
    validateLogin
}