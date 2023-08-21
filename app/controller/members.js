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
            helper.success(members_list, '拉取成功')
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
        const { role, user_id, project_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestMembersUpdate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 拉取这条成员信息记录
            const membersresult = await service.members.getMembers(user_id, project_id)
            // 拉取修改人信息
            const operateresult = await service.members.getMembers(userId, project_id)
            const isresult = (operateresult.role <= 2 && operateresult.role < role)
            if (!isresult) {
                const err = new Error('无权操作')
                err.status = 403
                throw err
            }
            // 不能改自己的吧
            if (membersresult.user_id === userId) {
                const err = new Error('不能玩自己的账号权限')
                err.status = 400
                throw err
            }
            // 修改状态
            await service.members.updateMembersRole(project_id, role, membersresult.user_id)
            helper.success(null, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
  * @summary 管理员/所有者删除成员
  * @description 管理员/所有者删除成员
  * @router post /v1/members/delete
  * @request body RequestMembersDelete
  * @response 200 RespnseMembersDelete 请求成功
  * @response 400 ErrorResponse 参数问题
  * @response 401 ErrorResponseUnauthorized 未登录
  * @response 403 ForbiddenError 无权
  * @response 500 InternalServerError 未知错误
  */
    async delete() {
        const { service, helper, rule, request, validate } = this.ctx
        const { project_id, user_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestMembersDelete, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 拉取这条成员信息记录
            const membersresult = await service.members.getMembers(user_id, project_id)
            // 拉取修改人信息
            const operateresult = await service.members.getMembers(userId, project_id)
            const isresult = (operateresult.role <= 2 && operateresult.role < membersresult.role)
            if (!isresult) {
                const err = new Error('无权操作')
                err.status = 403
                throw err
            }
            // 删除
            await service.members.delete(user_id, project_id)
            helper.success(null, '删除成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
* @summary 所有者转让身份
* @description 所有者转让身份
* @router post /v1/members/convert
* @request body RequestMembersConvert
* @response 200 ResponseMembersConvert 请求成功
* @response 400 ErrorResponse 参数问题
* @response 401 ErrorResponseUnauthorized 未登录
* @response 403 ForbiddenError 无权
* @response 500 InternalServerError 未知错误
*/
    async convert() {
        const { service, helper, rule, request, validate } = this.ctx
        const { project_id, user_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestMembersConvert, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 拉取这条成员信息记录
            const membersresult = await service.members.getMembers(user_id, project_id)
            // 拉取修改人信息
            const operateresult = await service.members.getMembers(userId, project_id)
            const isresult = (operateresult.role === 1)
            if (!isresult) {
                const err = new Error('无权操作')
                err.status = 403
                throw err
            }
            // 转让
            await service.members.updateMembersRole(project_id, 1, membersresult.user_id)
            await service.members.updateMembersRole(project_id, 2, userId)
            helper.success(null, '转让成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
* @summary 查询用户权限
* @description 查询用户权限
* @router post /v1/members/queryrole
* @request body RequestMembersQueryRole
* @response 200 ResponseMembersQueryRole 请求成功
* @response 400 ErrorResponse 参数问题
* @response 401 ErrorResponseUnauthorized 未登录
* @response 403 ForbiddenError 无权
* @response 500 InternalServerError 未知错误
*/
    async queryRole() {
        const { service, helper, rule, request, validate } = this.ctx
        const { project_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestMembersQueryRole, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            const role = await service.members.queryRole(userId, project_id)
            helper.success({ role }, '查询成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
}

module.exports = MembersController
