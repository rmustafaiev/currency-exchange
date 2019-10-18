const { Router } = require('express')

const router = Router({ mergeParams: true })

router.get('/historical', (req, res, next)=>{
    res.send("I should return historical values")
})
module.exports = router
