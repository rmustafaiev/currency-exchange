module.exports = function(logger) {
    return function(req, res, next) {
        const base = `${req.protocol}://${req.get('host')}`
        const method = req.method
        const startHrTime = process.hrtime()

        const message = (time, status) => `[${method}] [status: ${status}] [${time}ms] ${base}${req.path}`
        const statusOk = status => status >= 200 && status <= 300

        res.on('finish', () => {
            const { statusCode } = res
            const elapsedHrTime = process.hrtime(startHrTime)
            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6

            if (statusOk(statusCode)) {
                logger.info(message(elapsedTimeInMs, statusCode))
            } else {
                logger.error(message(elapsedTimeInMs, statusCode))
            }

        })

        next()
    }
}
