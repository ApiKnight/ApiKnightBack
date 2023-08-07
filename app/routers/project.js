'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 创建项目
    subRouter.post('/v1/project/create', controller.project.CreatProject)
    // 删除项目
    subRouter.post('/v1/project/delete', controller.project.DeleteProject)
    // 更新项目
    subRouter.post('/v1/project/update', controller.project.UpdateProject)
    // 拉取项目列表
    subRouter.get('/v1/project/list', controller.project.getProjectList)
    // 查询项目
    subRouter.post('/v1/project/query', controller.project.getProjectByProject)

}
