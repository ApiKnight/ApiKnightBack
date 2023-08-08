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
    * @response 401 ErrorResponseUnauthorized 未登录
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
            // 默认创建一个根目录
            await service.folder.create(null, '根目录', createresult.id)
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
   * @response 403 ForbiddenError 无权删除
   * @response 401 ErrorResponseUnauthorized 未登录
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
    * @response 403 ForbiddenError 无权更新
    * @response 401 ErrorResponseUnauthorized 未登录
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
    /**
   * @summary 获取项目列表
   * @description 拉取用户参与的那些项目
   * @router get /v1/project/list
   * @response 200 ResponseGetProjectList 请求成功
   * @response 400 ErrorResponse 参数问题登录失败
   * @response 403 ForbiddenError 无权获取
   * @response 401 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async getProjectList() {
        const { service, helper, state } = this.ctx
        try {
            // 获取用户ID
            const userId = state.user.id
            // 获取他拥有的项目id列表
            const project_id_list = await service.members.getProjectListByuserId(userId)
            // 通过项目id列表查询项目信息列表
            const project_list = await Promise.all(
                project_id_list.map(async element => {
                    const middle = await service.project.getByProjectId(element.toJSON().project_id)
                    middle.role = element.toJSON().role === 1111 ? '所有者' : '成员'
                    return middle
                })
            )
            helper.success(project_list, '获取成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }

    }
    /**
  * @summary 获取项目信息通过project_id
  * @description 拉取项目信息,创建人信息,项目里面的文件夹和api信息
  * @router post /v1/project/query
  * @request post RequestQueryProject
  * @response 200 ResponseQueryProject 请求成功
  * @response 400 ErrorResponse 参数问题登录失败
  * @response 403 ForbiddenError 无权获取
  * @response 401 ErrorResponseUnauthorized 未登录
  * @response 500 InternalServerError 未知错误
  */
    async getProjectByProject() {
        const { service, helper, state, validate, rule, request } = this.ctx
        const { projectid } = request.body
        try {
            const passed = await validate.call(this, rule.RequestQueryProject, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取用户ID
            const userId = state.user.id
            // 通过project_id 和 userId 查询角色
            const role = await service.members.selectRole(projectid, userId)
            // 通过项目id列表查询项目信息
            const project_result = await service.project.getByProjectId(projectid)
            // 通过项目id查询项目里的api列表
            const api_list = await service.apis.getApiByProjectId(projectid)
            // 通过项目id查询项目里的文件夹列表
            const folder_list = await service.folder.getFolderByProjectId(projectid)
            project_result.role = role
            project_result.api_list = api_list
            project_result.folder_list = folder_list
            helper.success(project_result, '获取成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
}

module.exports = ProjectController
