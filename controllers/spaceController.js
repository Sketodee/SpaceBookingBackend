const Space = require ('../model/Space')
const validator = require('../config/validator')

const getAllSpaces = async (req, res) => {
  const spaces = await Space.find();
  if(!spaces) return res.sendStatus(204)
    res.json(spaces)
}

const createNewSpace = async(req, res) => {
    const {error} = validator.validateSpace(req.body)
    if(error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({'Validation Errors' : validationErrors})
    }

    try {
        const result = await Space.create({
            name: req.body.name, 
            size: req.body.size
        })

        res.status(201).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({'error': 'failed to create space'})
    }
}

module.exports = {
    getAllSpaces, 
    createNewSpace
}