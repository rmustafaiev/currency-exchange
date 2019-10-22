const { formatYYYYMMDD } = require('../utils/date')

/*
How to format queries without executing them?
The library exposes all its query formatting methods to the client via namespace pgp.as:

const pgp = require('pg-promise');
const s = pgp.as.format("SELECT * FROM table WHERE field1 = $1", 123);
console.log(s);
*/

const queries = {
    rateByDate         : date => `SELECT * FROM currency_rates WHERE exchange_date = '${date}'`,
    rateByDtAndCurrency: (date, code) => `SELECT * FROM currency_rates WHERE exchange_date = '${date}' and code='${code}'`,
    rateRange          : (start, end) => `SELECT * FROM currency_rates WHERE exchange_date >= '${start}' AND exchange_date <= '${end}' ORDER BY exchange_date DESC`,
    rateRangeCur       : (start, end, cur) => `SELECT * FROM currency_rates WHERE code = '${cur}' AND exchange_date >= '${start}' AND exchange_date <= '${end}' ORDER BY exchange_date DESC`
}


module.exports = function makeRatesDb({ database }) {
    return {
        getRatesByRange,
        getRates,
        insert,
        update,
        remove
    }

    function getRatesByRange(start, end, currency, limit, offset) {
        const withCurrency = start && end && currency && queries.rateRangeCur(start, end, currency)
        const withDates = start && end && queries.rateRange(start, end)

        return database.any(withCurrency || withDates)
    }

    function getRates(date, currency) {
        const withCurrency = date && currency && queries.rateByDtAndCurrency(date, currency)
        const byDate = date && queries.rateByDate(date)

        return database.any(withCurrency || byDate)
    }

    function insert({ code, ds_name, rate, exchange_date }) {
        return database
            .one('INSERT INTO currency_rates(code, ds_name, rate, exchange_date) VALUES($1, $2, $3, $4) RETURNING id '
                , [ code, ds_name, rate, exchange_date ])
    }

    function update({ id, rate, exchange_date }) {
        return database
            .one('UPDATE currency_rates SET rate=$1, exchange_date=$2 WHERE id=$3 RETURNING id ',
                [ rate, exchange_date, id ])
    }

    function remove(id) {
        return database.result('DELETE FROM currency_rates WHERE id=$1', +id)
    }
}

