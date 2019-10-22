const { formatYYYYMMDD } = require('../utils/date')

/*
How to format queries without executing them?
The library exposes all its query formatting methods to the client via namespace pgp.as:

const pgp = require('pg-promise');
const s = pgp.as.format("SELECT * FROM table WHERE field1 = $1", 123);
console.log(s);
 */


module.exports = function makeRatesDb({ database }) {
    return {
        getHistorical,
        getRatesByRange,
        getRates,
        insert,
        update,
        remove
    }

    function getHistorical(date) {
        return database.any('SELECT * FROM currency_rates WHERE exchange_date = $1', [ date ])
    }

    function getRatesByRange(start, end, size, offset) {
        //return database.any('SELECT * FROM currency_rates BETWEEN $1 AND $2', [start, end])
        return database.any('SELECT * FROM currency_rates WHERE exchange_date >= $1 AND exchange_date <= $2'
            , [ start, end ])
    }

    function getRates(date, currency) {
        const today = formatYYYYMMDD(new Date().getTime())

        return database.any('SELECT * FROM currency_rates WHERE exchange_date = $1', today)
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
        return database.one('DELETE FROM currency_rates WHERE id=$1', id)
    }
}

