const { Router } = require('express')
const {
    getRatesByRange,
    getRates,
    createRate,
    updateRate,
    deleteRate,
    convertRates,
    convertRate
} = require('../controller/rate')

const router = Router({ mergeParams: true })

router.get('/rates/historical/from/:start/to/:end', getRatesByRange)
router.get('/rates/:date', getRates)
router.post('/rates', createRate)
router.put('/rates', updateRate)
router.delete('/rates/:rateId', deleteRate)
router.get('/rates/convert/:date/:currencyCode', convertRates)
router.get('/rates/convert/:date/:sourceCode/to/:targetCode', convertRate)

module.exports = router
