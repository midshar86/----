let express = require('express')
let route = express()

// let sub = require('./test')
// route.use('/', sub)

let uploader = require('./upload')
route.use('/upload', uploader)

module.exports = route