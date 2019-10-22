module.exports = function(logger) {
    return function(req, res, next) {
        const base = `${req.protocol}://${req.get('host')}`
        const method = req.method
        const startps = process.hrtime()

        const message = (time, status) => `[${method}] [status: ${status}] [${time} ms] ${base}${req.path}`
        const statusOk = status => status >= 200 && status <= 300

        res.on('finish', () => {
            const { statusCode } = res
            const elapsedps = process.hrtime(startps)
            const elapsedToMs = Math.round(elapsedps[0] * 1000 + elapsedps[1] / 1e6)

            if (statusOk(statusCode)) {
                logger.info(message(elapsedToMs, statusCode))
            } else {
                logger.error(message(elapsedToMs, statusCode))
            }

        })

        next()
    }
}
