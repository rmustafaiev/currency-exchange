const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('../api/router')

const { prefix } = require('../config').api
const {
    withLogger,
    errorHandler,
    notFound
} = require('../api/middlewares')

/**
 * Initialize, configure and return an express application.
 *
 * @param database
 * @param logger
 * @return {express} Express application
 */
module.exports = ({ logger }) => {
    const app = express()

    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(withLogger(logger))
    app.use(`${prefix}`, router)
    app.use(notFound)
    app.use(errorHandler(logger))

    return app
}
