const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

/**
 * Initialize, configure and return an express application.
 *
 * @param database
 * @param logger
 * @return {express} Express application
 */
module.exports = ({ database, logger }) =>  {
    const app = express()

    /**
     * Common middleware for apply
     */
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use((req, res, next) => {
        req.base = `${req.protocol}://${req.get('host')}`
        req.logger = logger
        req.database = database
        logger.info( req.params)
        return next()
    })
    /**
     * Use of API routes
     */
    app.use('/api', router)

    /**
     * Final Error handler.
     */
    app.use((error, req, res, next) => {
        logger.error("error:" , error)
        //res.status(error.status || 500)
        res.render({ error })
    })

    return app
}
