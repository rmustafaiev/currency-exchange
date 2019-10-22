const database = require('../../app-components/db')
const logger = require('../../utils/file-logger')({ logLevel: 'debug' })
const db = require('../../data-access/currencies')({ database, logger })

/**
 * Return available data sources
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getDataSources(req, res) {

    const ds = await db.getDataSources()
    const df = await db.getDefaultDatasource()

    res.send({ df, ds })


}

/**
 * Returns current data source codes
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function getDataSourceCurrencies(req, res) {

    console.log('getDataSourceCurrencies',  req.params)
    const dsName = req.params.datasource || 'UDS'

    const df = await db.getDataSourceCurrencies(dsName)

    res.send(df)
}

module.exports = {
    getDataSources,
    getDataSourceCurrencies
}
