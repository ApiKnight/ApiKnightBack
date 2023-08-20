'use strict'
const Service = require('egg').Service
const { literal } = require('sequelize')
class MembersService extends Service {
    // 验证创建权限
    async validate_permissions(userId, project_id, validate_power) {
        const resultinfo = await this.ctx.model.Members.findOne({ where: { user_id: userId, project_id } })
        if (!resultinfo) {
            const error = new Error('无权操作')
            error.status = 403
            throw error
        }
        return resultinfo.toJSON().role <= validate_power
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
            const error = new Error('无权')
            error.status = 403
            throw error
        }
    }
    // 拉取一个项目里的成员信息
    async selectMembersListByProjectid(project_id) {
        const members_list = await this.ctx.model.Members.findAll({
            where: {
                project_id
            },
            attributes: [
                'role',
                'user_id',
                [literal('user.username'), 'name'], // 重命名字段为 'username'
                [literal('user.avatar_url'), 'avatar_url']
            ],
            include: {
                model: this.ctx.model.User,
                attributes: []
            },
            raw: true
        })
        return members_list

    }
    // 把用户添加进项目
    async createMembers(project_id, user_id, role) {
        // 创建项目
        await this.ctx.model.Members.create({
            project_id,
            user_id,
            role
        })
    }
    // 通过id查询成员信息记录
    async getMembers(user_id, project_id) {
        const resultinfo = await this.ctx.model.Members.findOne({ where: { user_id, project_id } })
        if (!resultinfo) {
            const error = new Error('未知错误')
            error.status = 500
            throw error
        }
        return resultinfo.toJSON()
    }
    // 更改用户角色
    async updateMembersRole(project_id, role, user_id) {
        try {
            await this.ctx.model.Members.update({
                role
            }, {
                where: {
                    project_id, user_id
                }
            })
        } catch (error) {
            const err = new Error('未知错误')
            err.status = 500
            throw err
        }
    }
    async getMembersCountProjectId(project_id) {
        const MembersCount = await this.ctx.model.Members.count({
            where: {
                project_id
            }
        })
        return MembersCount
    }
    async delete(user_id, project_id) {
        const { ctx } = this
        try {
            const result = await ctx.model.Members.destroy({
                where: { user_id, project_id }
            })
            return result
        } catch (err) {
            const error = new Error('未知错误')
            error.status = 500
            throw error
        }
    }
    async queryRole(user_id, project_id) {
        try {
            const member = await this.ctx.model.Members.findOne({
                where: {
                    user_id,
                    project_id
                }
            })

            if (member) {
                return member.role
            }
            return 0
        } catch (error) {
            // 处理错误
            console.error('Error querying role:', error)
            throw error
        }
    }
}
module.exports = MembersService
