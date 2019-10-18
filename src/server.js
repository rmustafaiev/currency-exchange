require('dotenv').config()

//console.log(process.env.PWD)

const database = require('./app-components/db')

const logger = require('./helpers/logger')({ logLevel: 'debug' })
const app = require('./app-components/express')({ database, logger })
const port = process.env.PORT


app.listen(port, function() {
    logger.info(`Example app listening on port ${port}!`)
})
app.on('response', function() {
    logger.debug('resp: ')
})

