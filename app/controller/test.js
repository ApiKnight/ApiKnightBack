'use strict'

const Controller = require('egg').Controller
/**
 * @controller Home模块
 */
class TestController extends Controller {
    async test1() {
        const { service, helper, request, validate, rule, state } = this.ctx
        const { project_id, projectname } = request.body
        // 获取用户ID和请求参数
        const userId = state.user.id
        try {
            const resultinfo = await service.members.validate_permissions(userId, project_id)
            helper.success(resultinfo, '获取成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
}

module.exports = TestController
