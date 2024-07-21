let express = require('express')
let route = express.Router()
let multer = require('multer')

let upload = multer({ dest: 'userFiles/' })

route.post('/', upload.single('file'), (req, res) => {
    let option = {
        code: 1,
        file: req.file,
        body: req.body
    }
    res.json(option)
})

module.exports = route