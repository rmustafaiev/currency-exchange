/**
 * Brings Error 404 to next handler
 * @return {Function} req, res, next, Express error handler signature ..
 */
module.exports = function(req, res, next) {
    const error = new Error('Resource Not found.')
    error.status = 404

    next(error)
}
