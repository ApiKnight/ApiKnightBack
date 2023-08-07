'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 创建文件夹
    subRouter.post('/v1/folder/create', controller.folder.create)
    // 更新文件夹
    subRouter.post('/v1/folder/update', controller.folder.update)
    // 删除文件夹
    subRouter.post('/v1/folder/delete', controller.folder.delete)

}
