const { Router } = require('express')

const router = Router({ mergeParams: true })

router.get('/rates', async (req, res) => {
    const ds = req.params
    const db = req.database
    const message = 'I should return latest rates by dataSource or : ' + ds
    req.logger.info(message)


    try {
        const any = await db.any('SELECT NOW() as now', [ true ])
        req.logger.info('DB Saies: ', any)
        // success
    } catch (e) {
        // error
        req.logger.error('DB Err: ', e)
    }

    return res.send(message)
})

router.post('/rates', (req, res) => {

    const q = { ...req.query }
    const b = req.body

    const message = 'Something were posted'

    return res.send(message)
})

module.exports = router
