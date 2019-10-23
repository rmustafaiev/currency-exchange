require('dotenv').config()

const database = require('../src/app-components/db')
const logger = require('../src/app-components/logger')
const QueryFile = require('pg-promise').QueryFile
const path = require('path')


const createSQLFile = file => {
    const fullPath = path.join(__dirname, file)
    return new QueryFile(fullPath, { minify: false })
}

const sqls = {
    dropSchema   : createSQLFile('sql/drop-schema.sql'),
    createSchema : createSQLFile('sql/create-schema.sql'),
    fulfillTables: createSQLFile('sql/insert-all.sql'),
    fulfillRates : createSQLFile('sql/insert-rates.sql')
}


async function main() {
    logger.info('Migrations scripts started:')

    try {
        await database.none(sqls.dropSchema, [ true ])
        await database.none(sqls.createSchema, [ true ])
        await database.none(sqls.fulfillTables, [ true ])
        await database.none(sqls.fulfillRates, [ true ])


    } catch (error) {
        logger.error('Migrations scripts failed: ', error)
    }

    logger.info('Migrations scripts completed:')
}

main().then().catch(console.error)
