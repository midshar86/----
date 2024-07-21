let express = require('express')
let route = express.Router()
let upload = require('./base')


let setting = [
    { name: 'file1' },
    { name: 'file2' }
]

function handlerFields(req, res) {
    let option = {
        code: 1,
        files: req.files,
        infos: req.body
    }
    res.json(option)
}

route.post('/fields', upload.fields(setting), handlerFields)


module.exports = route