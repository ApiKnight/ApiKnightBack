'use strict'
const Controller = require('egg').Controller
/**
 * @controller Members模块
 */
class MembersController extends Controller {
    /**
    * @summary 拉取项目成员
    * @description 传入projectid
    * @router post /v1/members/list
    * @request body RequestMembersList
    * @response 200 ResponseMembersList 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 403 ForbiddenError 无权
    * @response 500 InternalServerError 未知错误
    */
    async getMembers() {
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
            // 判断他是不是项目成员
            await service.members.isMemberOfProject(projectid, userId)
            // 拉取项目成员
            const members_list = await service.members.selectMembersListByProjectid(projectid)
            helper.success(members_list, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
    * @summary 项目管理员赋予成员权限
    * @description 传入成员记录id,希望更改的权限role
    * @router post /v1/members/update
    * @request body RequestMembersUpdate
    * @response 200 ResponseRoleUpdate 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 403 ForbiddenError 无权
    * @response 500 InternalServerError 未知错误
    */
    async membersRoleUpdate() {
        const { service, helper, rule, request, validate } = this.ctx
        const { role, id } = request.body
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
            // 拉取这条成员信息记录
            const membersresult = await service.members.getMembersById(id)
            // 判断用户是不是项目所有者
            await service.project.isOwner(membersresult.project_id, userId)
            // 不能改自己的吧
            if (membersresult.user_id === userId) {
                const err = new Error('不能玩自己的账号权限')
                err.status = 400
                throw err
            }
            // 修改状态
            await service.members.updateMembersRole(id, role)
            helper.success(null, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
}

module.exports = MembersController
