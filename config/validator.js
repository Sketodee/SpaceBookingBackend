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

const validateBooking = (booking) => {
    const bookingSchema = Joi.object({
        spaceId: Joi.string().required().messages({
            'any.required': 'spaceId is required',
            'string.empty': 'spaceId cannot be empty'
        }), 
        numberOfGuests: Joi.number().integer().required().messages({
            'number.base': 'numberOfGuests must be a number',
            'any.required': 'numberOfGuests is required'
        }), 
        decorations: Joi.boolean().required().messages({
            'boolean.base': 'decorations must be a boolean value',
            'any.required': 'decorations is required'
        }), 
        eventType: Joi.string().required().messages({
            'any.required': ' is required',
            'string.empty': 'Event Type cannot be empty'
        }),
        feedingRequirement: Joi.string().required().messages({
            'any.required': 'feedingRequirement is required',
            'string.empty': 'feedingRequirement cannot be empty'
        }),
        musicPolicy: Joi.boolean().required().messages({
            'boolean.base': 'musicPolicy  must be a boolean value',
            'any.required': 'musicPolicy  is required'
        }), 
       bookedDates : Joi.array()
       .items(
            Joi.object({
            date: Joi.date().required().messages({
                'date.base': 'date must be a valid date',
                'any.required': 'date is required'
            })
          })
       )
       .min(1)
       .messages({
         'array.base': 'bookedDates must be an array',
         'array.empty': 'bookedDates cannot be empty',
         'any.required': 'bookedDates are required',
         'array.min': 'At least one bookedDate is required',
        //  'any.only': 'Each tag must be a non-empty string'
       })
    })
}

module.exports = {
    validateSpace, 
    validateUser, 
    validateLogin
}