let { resolve, parse } = require('path')
let multer = require('multer')

let setter = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, resolve(__dirname, '../public/images'))
    },
    filename(req, file, callback) {
        let { originalname } = file
        let { ext, name } = parse(originalname)
        callback(null, `${name}-${Date.now()}${ext}`)
    }
})

let upload = multer({ storage: setter })

module.exports = upload