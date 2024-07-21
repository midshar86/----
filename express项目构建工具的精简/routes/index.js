let express = require('express')
let route = express()

let sub = require('./sub')
route.use('/', sub)

module.exports = route