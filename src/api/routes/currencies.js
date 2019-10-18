const { Router } = require('express')

const router = Router({ mergeParams: true })

router.get('/currencies', (req, res, next)=>{
    res.send('I should return curencies list')
})

module.exports = router
