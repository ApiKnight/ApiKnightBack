'use strict'

const Controller = require('egg').Controller
/**
 * @controller Project模块
 */
class ProjectController extends Controller {
    /**
    * @summary 创建项目
    * @description 创建项目
    * @router post /v1/project/create
    * @request body RequestCreateProject
    * @response 200 ResponseCreateProject 请求成功
    * @response 400 ErrorResponse 参数问题登录失败
    * @response 601 ErrorResponseUnauthorized 未登录
    */
    async CreatProject() {
        const { service, helper, request, validate, rule, state } = this.ctx
        const { description, projectname } = request.body
        try {
            // 参数验证
            const passed = await validate.call(this, rule.RequestCreateProject, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取用户ID
            const userId = state.user.id
            // 创建项目
            const createresult = await service.project.create({ projectname, description, create_user: userId })
            delete createresult.create_user
            helper.success(createresult, '创建成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
    /**
   * @summary 删除项目
   * @description 删除项目,必须是项目创建者
   * @router post /v1/project/delete
   * @request body RequestDeleteProject
   * @response 200 ResponseDeleteProject 请求成功
   * @response 400 ErrorResponse 参数问题
   * @response 401 RespnseDeleteError 无权删除
   * @response 601 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async DeleteProject() {
        const { service, helper, request, validate, rule, state } = this.ctx
        const { projectid } = request.body
        try {
            const passed = await validate.call(this, rule.RequestDeleteProject, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取用户ID
            const userId = state.user.id
            // 判断用户是不是项目所有者
            await service.project.isOwner(projectid, userId)
            // 尝试删除
            await service.project.delete({ projectid })
            helper.success(null, '删除成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
    /**
    * @summary 更新项目
    * @description 更新项目,必须是项目创建者,可以只改description,projectname或者两者都改
    * @router post /v1/project/update
    * @request body RequestUpdateProject
    * @response 200 ResponseUpdateProject 请求成功
    * @response 400 ErrorResponse 参数问题登录失败
    * @response 401 RespnseDeleteError 无权删除
    * @response 601 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 未知错误
    */
    async UpdateProject() {
        const { service, helper, request, validate, rule, state } = this.ctx
        const { projectid, description, projectname } = request.body
        try {

            const passed = await validate.call(this, rule.RequestUpdateProject, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取用户ID
            const userId = state.user.id
            // 判断用户是不是项目所有者
            await service.project.isOwner(projectid, userId)
            // 尝试更新
            await service.project.update({ projectid, description, projectname })
            // 拉取项目最新内容
            const updateproject = await service.project.getByProjectId(projectid)
            helper.success(updateproject, '更新成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
}

module.exports = ProjectController
