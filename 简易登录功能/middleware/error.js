// 定义错误处理中间件
function handlerError(err, req, res, next) {
    res.json({
        code: 0,
        message: err
    })
}

module.exports = {
    handlerError
}