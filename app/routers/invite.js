'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)
    // 邀请成员
    subRouter.post('/v1/invite/sending', controller.invite.inviteSending)
    // 成员申请加入
    subRouter.post('/v1/invite/receive', controller.invite.inviteReceive)
    // 拉取审批名单
    subRouter.post('/v1/invite/wlist', controller.invite.inviteList1)
    // 拉取审批名单
    subRouter.get('/v1/invite/alist', controller.invite.inviteList2)
    // 更新审批status状态
    subRouter.post('/v1/invite/updatestatus', controller.invite.inviteUpdate)
}
