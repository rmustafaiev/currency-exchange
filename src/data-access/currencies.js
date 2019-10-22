module.exports = function makeCurrenciesDb({ database }) {
    return {
        getDataSources,
        getDataSourceCurrencies,
        getDefaultDatasource
    }

    function getDataSources() {
        return database.any('SELECT * FROM data_sources')
    }

    function getDefaultDatasource() {
        return database.one('SELECT * FROM data_sources WHERE is_default=true')
    }

    function getDataSourceCurrencies(sourceName) {
        return database.any('SELECT (code) FROM data_source_currencies WHERE name=$1', sourceName)
    }
}
