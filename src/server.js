require('dotenv').config()

const database = require('./app-components/db')
const logger = require('./app-components/logger')

const app = require('./app-components/express')({ database, logger })
const port = process.env.PORT

app.listen(port, function() {
    logger.info(`Application listening on port ${port}`)
})
