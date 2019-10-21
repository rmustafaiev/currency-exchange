require('dotenv').config()

const database = require('../src/app-components/db')
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
    fulfillRates: createSQLFile('sql/insert-rates.sql')
}


async function main() {
    console.log('Migration scripts: ')
    try {
        const drop = await database.any(sqls.dropSchema, [ true ])
        const create = await database.any(sqls.createSchema, [ true ])
        const fillAll = await database.any(sqls.fulfillTables, [ true ])
        const fillRates = await database.any(sqls.fulfillRates, [ true ])


        //console.log(`DB Drop ? ${drop}, Create ? ${create}, Fill ? ${fill}`)
        console.log('DB  scripts succeded')
        // success
    } catch (error) {
        console.error('DB Error: ', error.stack)
    }

}

main().then().catch(console.error)
