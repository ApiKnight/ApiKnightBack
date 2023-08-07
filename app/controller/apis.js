'use strict'

const Controller = require('egg').Controller
/**
 * @controller Apis模块
 */
class ApisController extends Controller {
    /**
    * @summary 创建apis
    * @description 传入所属文件夹id:folder_id,请求参数:request_data,响应数据:response_data,项目id:project_id,描述内容:description,name:名字
    * @router post /v1/apis/create
    * @request body RequestApisCreate
    * @response 200 ResponseCreateApis 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 403 ForbiddenError 无权
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 未知错误
    */
    async create() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { name, folder_id, request_data, response_data, project_id, description } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestApisCreate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 看看他有没有创建的资格
            const isresult = await service.members.validate_permissions(userId, project_id, app.config.addpower)
            if (isresult) {
                // 尝试创建
                await service.apis.create(userId, name, folder_id, request_data, response_data, project_id, description)
                // 创建历史记录
                // 代做
                helper.success(null, '创建成功')
            } else {
                const err = new Error('无权操作')
                err.status = 403
                throw err
            }

        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
    * @summary 删除apis
    * @description 传入apis的id:apis_id
    * @router post /v1/apis/delete
    * @request body RequestApisDelete
    * @response 200 ResponseDeleteApis 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 403 ForbiddenError 无权
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 未知错误
    */
    async delete() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { apis_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestApisDelete, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 查询这个apis的信息
            const apiresult = await service.apis.getApiById(apis_id)
            // 通过这个apis所属的projectid看看他有没有删除的资格
            const isresult = await service.members.validate_permissions(userId, apiresult.project_id, app.config.deletepower)
            if (isresult) {
                // 尝试删除
                await service.apis.delete(apis_id)
                // 删除对应的历史记录
                // 待处理
                helper.success(null, '删除成功')
            } else {
                const err = new Error('无权操作', apiresult)
                err.status = 403
                throw err
            }

        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
   * @summary 更改apis
   * @description 传入apis的id:apis_id,所属文件夹id:folder_id,响应信息: response_data,请求信息:request_data,描述内容:description,apis的新名字:name
   * @router post /v1/apis/update
   * @request body RequestApisUpdate
   * @response 200 ResponseUpdateApis 请求成功
   * @response 400 ErrorResponse 参数问题
   * @response 403 ForbiddenError 无权
   * @response 401 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async update() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { apis_id, folder_id, response_data, request_data, description, name, notes } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestApisUpdate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 查询这个apis的信息
            const apiresult = await service.apis.getApiById(apis_id)
            // 通过这个apis所属的projectid看看他有没有更改的资格
            const isresult = await service.members.validate_permissions(userId, apiresult.project_id, app.config.writepower)
            // 核实folder_id合不合法
            if (folder_id) {
                await service.folder.checkFolderInProject(folder_id, apiresult.project_id)
            }
            if (isresult) {
                // 尝试更改
                await service.apis.update(userId, apis_id, folder_id, response_data, request_data, description, name)
                // 新增对应的历史记录
                await service.version.create({ apis_id, userId, request_data, response_data, description, name, notes })
                helper.success(null, '更改成功')
            } else {
                const err = new Error('无权操作', apiresult)
                err.status = 403
                throw err
            }

        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
  * @summary 查询api内容
  * @description 通过apis_id查询api内容
  * @router post /v1/apis/query
  * @request body RequestApisQuery
  * @response 200 ResponseQueryApis 请求成功
  * @response 400 ErrorResponse 参数问题
  * @response 403 ForbiddenError 无权
  * @response 401 ErrorResponseUnauthorized 未登录
  * @response 500 InternalServerError 未知错误
  */
    async query() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { apis_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestApisQuery, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 查询这个apis的信息
            const apiresult = await service.apis.getApiById(apis_id)
            // 通过这个apis所属的projectid查询他是不是成员
            await service.members.isMemberOfProject(apiresult.project_id, userId)
            helper.success(apiresult, '更改成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
}

module.exports = ApisController
