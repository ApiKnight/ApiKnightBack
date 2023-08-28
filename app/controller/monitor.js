'use strict'
const promClient = require('prom-client')
const Controller = require('egg').Controller
/**
 * @controller Monitor模块
 */
class MonitorController extends Controller {
    /**
* @summary 上传监控数据
* @description 上传监控数据
* @router post /v1/monitor/upload
* @request post RequestMonitorUpload
* @response 200 ResponseMonitorUpload 请求成功
* @response 400 ErrorResponse 参数问题登录失败
* @response 403 ForbiddenError 无权获取
* @response 500 InternalServerError 未知错误
*/
    async upload() {
        const { service, helper, request, validate, rule } = this.ctx
        const { url, type, message } = request.body
        try {
            const passed = await validate.call(this, rule.RequestMonitorUpload, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 通过project_id 和 userId 查询角色
            await service.monitor.upload({ url, type, message })
            helper.success(null, '上传成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
    async show() {
        const { ctx } = this
        const metrics = await promClient.register.metrics()
        ctx.body = metrics
        ctx.set('Content-Type', promClient.register.contentType)
    }
}

module.exports = MonitorController
