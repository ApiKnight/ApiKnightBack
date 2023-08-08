'use strict'

const Controller = require('egg').Controller
/**
 * @controller Folder模块
 */
class FolderController extends Controller {
    /**
     * @summary 创建文件夹
     * @description 传入项目id:project_id,父文件夹id:parent_id,文件夹名:name,需要拥有增加权限
     * @router post /v1/folder/create
     * @request body RequestFolderCreate
     * @response 200 ResponseCreateFolder 请求成功
     * @response 400 ErrorResponse 参数问题
     * @response 403 ForbiddenError 无权
     * @response 401 ErrorResponseUnauthorized 未登录
     * @response 500 InternalServerError 未知错误
     */
    async create() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { project_id, parent_id, name } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestFolderCreate, request.body)
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
                await service.folder.create(parent_id, name, project_id)
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
   * @summary 更改文件夹
   * @description 传入文件夹id:folder_id,父文件夹id:parent_id可选,文件夹名:name可选,需要拥有修改权限
   * @router post /v1/folder/update
   * @request body RequestFolderUpdate
   * @response 200 ResponseUpdateFolder 请求成功
   * @response 400 ErrorResponse 参数问题
   * @response 403 ForbiddenError 无权
   * @response 401 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async update() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { folder_id, parent_id, name } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestFolderUpdate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 查到这个文件夹
            const folderresult = await service.folder.getFolderByid(folder_id)
            // 看看他有没有更改的资格
            const isresult = await service.members.validate_permissions(userId, folderresult.project_id, app.config.writepower)
            if (isresult) {
                // 尝试更改
                await service.folder.update(folder_id, parent_id, name)
                helper.success(null, '更改成功')
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
   * @summary 删除文件夹
   * @description 传入文件夹id:folder_id,需要删除权限
   * @router post /v1/folder/delete
   * @request body RequestFolderDelete
   * @response 200 ResponseDeleteFolder 请求成功
   * @response 400 ErrorResponse 参数问题
   * @response 403 ForbiddenError 无权
   * @response 401 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async delete() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { folder_id } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestFolderDelete, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 查到这个文件夹
            const folderresult = await service.folder.getFolderByid(folder_id)
            // 看看他有没有删除的资格
            const isresult = await service.members.validate_permissions(userId, folderresult.project_id, app.config.deletepower)
            if (isresult) {
                // 尝试删除
                await service.folder.delete(folder_id)
                helper.success(null, '删除成功')
            } else {
                const err = new Error('无权操作')
                err.status = 403
                throw err
            }
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
}

module.exports = FolderController
