require('dotenv').config()

const database = require('./app-components/db')

const logger = require('./utils/logger')({ logLevel: 'debug' })
const app = require('./app-components/express')({ database, logger })
const port = process.env.PORT

app.on('response', function() {
    logger.debug('resp: ')
})

app.listen(port, function() {
    logger.info(`Example app listening on port ${port}!`)
})


