let mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/newUser').then(() => console.log('数据库连接成功！')).catch(err => console.log('数据库连接失败!' + err))

// 设置用户基本信息数据结构
let userBaseInfo = new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'secret'],
        default: 'secret'
    }
})

let userBaseInfoModel = mongoose.model('users', userBaseInfo)

// 导出用户基本信息的模式
module.exports = userBaseInfoModel