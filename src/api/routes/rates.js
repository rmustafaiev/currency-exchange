const { Router } = require('express')

const router = Router({ mergeParams: true })

router.get('/rates', async (req, res) => {
    const db = req.database
    const message = 'I should return latest rates by dataSource or : '

    return res.send(message)
})

router.post('/rates', (req, res) => {
    const message = 'I should accept rates update'

    return res.send(message)
})

module.exports = router
