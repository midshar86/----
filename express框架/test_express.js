let express =require('express')

let app=express()

app.use('/', (req,res) => {
    res.send('服务器已响应!')
})

app.listen(3456, () => {
    console.log(`监听端口成功!目前监听的端口号为3456!`)
})