/**
 * Express App Error handler general purpose
 * @param logger
 * @return {Function } err, req, res, next, Express error handler signature ..
 */
module.exports = function(logger) {
    return function(err, req, res) {

        if (err.status === 404) {
            res.status(err.status).send({ body: 'Resource Not found' })
        } else {
            res.status(500).send({ body: 'An unkown error occurred.' })
        }
    }
}
