const database = require('../../app-components/db')
const logger = require('../../utils/file-logger')()
const db = require('../../data-access/rates')({ database, logger })
const { converter } = require('../../utils/currency')
const { omit } = require('../../utils/object')

module.exports = {
    getRatesByRange,
    getRates,
    createRate,
    updateRate,
    deleteRate,
    convertRates,
    convertRate
}

const BASE = 'UAH'

//TODO Add paging
/*
SELECT select_list
    FROM table_expression
    [LIMIT { number | ALL }] [OFFSET number]

     SELECT *
    FROM items
    LIMIT {itemsPerPage} OFFSET {(page - 1) * itemsPerPage}
 */
/**
 * Returns historical rates for specified date range.
 * @param req
 * @param res
 * @return {Promise<void>}
 * query= currency=USD&limit=10&offset=3
 */
async function getRatesByRange(req, res, next) {
    try {
        const { start, end } = req.params
        const { currency, limit, offset } = req.query

        console.log('!!!!!!!!!!!! getRatesByRange')
        console.log(start, end, currency, limit, offset)

        const result = await db.getRatesByRange(start, end, currency, limit, offset)


        res.send(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

/**
 * Returns latest rates (current date)
 * @param req
 * @param res
 * @return {Promise<void>}
 * query = ?currency=USD
 */
async function getRates(req, res, next) {
    try {
        const { date } = req.params
        const { currency } = req.query
        const rates = await db.getRates(date, currency)
        const { exchange_date, ds_name } = rates.length && rates[0]
        const omitProps = obj => omit(obj, [ 'ds_name', 'exchange_date', 'modified' ])

        const result = {
            base        : BASE,
            dataSource  : ds_name,
            ecxhangeDate: exchange_date,
            rates       : rates.map(omitProps)
        }

        res.send(result)
    } catch (err) {
        next(err)
    }
}

/**
 * Creates new currency rate entry
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function createRate(req, res, next) {
    try {
        const payload = req.body

        const createId = await db.insert(payload)

        res.send(createId)
    } catch (err) {
        next(err)
    }
}

/**
 * Update modify an existing currency rate
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function updateRate(req, res, next) {
    try {
        const payload = req.body

        const updateId = await db.update(payload)

        res.send(updateId)
    } catch (err) {
        next(err)
    }
}

/**
 * Delete currency rate
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function deleteRate(req, res, next) {
    try {
        const { rateId } = req.params
        const result = await db.remove(rateId)
        const { rowCount } = result

        res.send({ count: rowCount })
    } catch (err) {
        next(err)
    }
}

/**
 * Converts current currency rates actually the base
 * changed by parameter specified
 * @param req
 * @param res
 * @return {Promise<void>}
 * query ? amount=1
 */
async function convertRates(req, res, next) {
    try {
        const { date, currencyCode } = req.params
        const { amount } = req.query || {}

        const rates = await db.getRates(date)
        const newBaseRate = rates.filter(cr => cr.code === currencyCode.toUpperCase()).pop()
        const { exchange_date, rate, code } = newBaseRate

        const convert = converter(code, rate, BASE)
        const convertEach = ({ rate, code }) => convert(rate, code, amount)
        const skip = o => omit(o, 'base')

        const result = {
            base        : code,
            exchangeDate: exchange_date,
            rates       : rates.map(convertEach).map(skip)
        }

        res.send(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

/**
 * Converts one currency to another rate cross course
 * @param req
 * @param res
 * @return {Promise<void>}
 * query ? amount=1
 */
async function convertRate(req, res, next) {
    try {
        const { date, sourceCode, targetCode } = req.params
        const { amount = 1 } = req.query || {}

        const rates = await db.getRates(date)
        const baseRate = rates.filter(cr => cr.code === sourceCode.toUpperCase()).pop()
        const targetRate = rates.filter(cr => cr.code === targetCode.toUpperCase()).pop()

        const { exchange_date } = baseRate

        const convert = converter(baseRate.code, baseRate.rate, BASE)
        const converted = convert(targetRate.rate, targetRate.code, amount)

        const result = {
            exchangeDate: exchange_date,
            ...converted
        }

        res.send(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
