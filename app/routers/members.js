'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 拉取成员信息
    subRouter.post('/v1/members/list', controller.members.getMembers)
    // 更新成员权限
    subRouter.post('/v1/members/update', controller.members.membersRoleUpdate)
}
