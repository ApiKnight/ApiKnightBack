'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 创建api
    subRouter.post('/v1/apis/create', controller.apis.create)
    // 删除api
    subRouter.post('/v1/apis/delete', controller.apis.delete)
    // 更改api
    subRouter.post('/v1/apis/update', controller.apis.update)
    // 查询api
    subRouter.post('/v1/apis/query', controller.apis.query)
}
