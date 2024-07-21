// 引入数据库操作模块
let userBaseInfoModel = require('../utils/database')

function handlerRegister(req, res) {
    let { username, password, nickname, age, gender } = req.body
    // 先在数据库中查找是否有同名的数据, 如果存在同名数据, 则报错
    userBaseInfoModel.find({ username }).then(data => {
        // 查找结果为空数组, 则表示数据库中没有同名数据
        // 此时向数据库中存入数据
        if (data.length === 0) {
            new userBaseInfoModel({
                username,
                password,
                nickname,
                age,
                gender
            })
                .save()
                .then(data => {
                    let option = {
                        code: 1,
                        message: '用户信息存储成功!',
                        username,
                        nickname,
                        age,
                        gender
                    }
                    res.json(option)
                })
                .catch(err => { })
        } else { // 如果查询的数组不为空, 则表示数据库中存在同名数据
            let option = {
                code: 0,
                message: '已经存在同名用户, 请修改用户名后重试!'
            }
            res.json(option)
        }
    })
}

module.exports = {
    handlerRegister
}