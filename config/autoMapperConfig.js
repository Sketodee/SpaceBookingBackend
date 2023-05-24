const {createMap} = require('automapper-js')

const configureMappings  = () => {
    createMap('UserDTO', 'User')
    createMap('User', 'UserDTO')
}

module.exports = configureMappings

