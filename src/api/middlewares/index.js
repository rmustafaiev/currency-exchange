const errorHandler = require('./errorHandler')
const notFound = require('./notFound')
const withLogger = require('./withLogger')

// Todo
// use JWT token
// use req to exctract the token from headers
// will be used to protect API from modification from the un Auth users

//The Aim to introduce lock/ackquire mechanics
// in order to NOT ALLOW EDIT API/rates at same time for multiple users


module.exports = {
    errorHandler,
    notFound,
    withLogger
}
