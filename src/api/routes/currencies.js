const { Router } = require('express')
const { getDataSourceCurrencies } = require('../controller/currency')
const router = Router({ mergeParams: true })

router.get('/currencies', getDataSourceCurrencies)

module.exports = router
