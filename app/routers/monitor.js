'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 创建项目
    subRouter.post('/v1/monitor/upload', controller.monitor.upload)

    router.get('/metrics', controller.monitor.show)
}
