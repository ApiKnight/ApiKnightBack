'use strict'
const Controller = require('egg').Controller
/**
 * @controller Invite模块
 */
class MembersController extends Controller {
    /**
    * @summary 拉取项目成员
    * @description 传入projectid
    * @router post /v1/members/list
    * @request body RequestMembersList
    * @response 200 ResponseStatusUpdate 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 修改失败
    */
    async inviteUpdate() {
        const { service, helper, rule, request, validate } = this.ctx
        const { projectid } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestMembersList, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 修改状态
            await service.invite.update(id, status, userId)
            helper.success(null, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
    * @summary 项目管理员赋予成员权限
    * @description 传入projectid,审批记录id,修改状态status 0待审批,1通过,-1拒绝
    * @router post /v1/members/update
    * @request body RequestUpdate
    * @response 200 ResponseStatusUpdate 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 修改失败
    */
    async inviteUpdate() {
        const { service, helper, rule, request, validate } = this.ctx
        const { status, id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestUpdate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 修改状态
            await service.invite.update(id, status, userId)
            helper.success(null, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
}

module.exports = MembersController
