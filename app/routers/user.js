'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)

    // 注册用户信息
    subRouter.post('/v1/user/info', controller.user.info)
    // 注册用户信息
    subRouter.post('/v1/user/register', controller.user.register)
    // 登录用户信息
    subRouter.post('/v1/user/login', controller.user.login)
    // 更新用户信息
    subRouter.post('/v1/user/update', controller.user.update)
    // 查看username or email or phone 是否被注册
    subRouter.post('/v1/user/checkExist', controller.user.checkExist)
    // 通过邮箱模糊匹配用户
    subRouter.post('/v1/user/searchUsersByEmail', controller.user.searchUsersByEmail)
    // 通过userId查询用户
    subRouter.post('/v1/user/query', controller.user.queryUserInfo)
    // 获取自身信息
    subRouter.post('/v1/user/queryself', controller.user.queryUserSelfInfo)
}
