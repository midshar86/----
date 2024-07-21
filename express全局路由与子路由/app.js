let express = require('express')
let sub = require('./routers/sub')

let app = express()

app.use('/', sub)

app.listen(3456, () => {
    console.log('端口监听成功!')
})