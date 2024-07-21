let router = require('express').Router()
let { handlerRegister } = require('../controller/register')

router.post('/register', handlerRegister)

module.exports = router