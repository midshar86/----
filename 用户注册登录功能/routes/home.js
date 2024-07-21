let router = require('express').Router()
let { handlerVerify } = require('../controller/verify')

router.get('/home', handlerVerify)
    
module.exports = router