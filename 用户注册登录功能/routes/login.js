let router = require('express').Router()
let { handlerLogin } = require('../controller/login')

router.post('/login', handlerLogin)

module.exports = router