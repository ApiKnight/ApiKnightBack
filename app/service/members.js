'use strict'
const Service = require('egg').Service

class MembersService extends Service {
    // 验证创建权限
    async validate_permissions(userId, project_id, validate_power) {
        const resultinfo = await this.ctx.model.Members.findOne({ where: { user_id: userId, project_id } })
        if (!resultinfo) {
            const error = new Error('无权操作')
            error.status = 403
            throw error
        }
        return (resultinfo.toJSON().role & validate_power) !== 0
    }
    // 通过project_id 和 userId 查询角色
    async selectRole(project_id, userId) {
        const resultinfo = await this.ctx.model.Members.findOne({ where: { user_id: userId, project_id } })
        if (!resultinfo) {
            const error = new Error('无权操作')
            error.status = 403
            throw error
        }
        return resultinfo.toJSON().role
    }
    // 通过userid查询他参加的项目
    async getProjectListByuserId(userId) {
        const project_id_list = await this.ctx.model.Members.findAll({
            where: {
                user_id: userId
            }
        })
        return project_id_list
    }
    // 判断这个用户是不是项目成员
    async isMemberOfProject(project_id, user_id) {
        const resultinfo = await this.ctx.model.Members.findOne({ where: { user_id, project_id } })
        if (!resultinfo) {
            const error = new Error('未知错误')
            error.status = 500
            throw error
        }
    }
}
module.exports = MembersService
