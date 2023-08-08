'use strict'
const Service = require('egg').Service
const { Op, literal } = require('sequelize')
class InviteService extends Service {
    // 添加一条用户申请加入组织记录
    async create({ project, userId }) {
        // 创建新用户
        await this.ctx.model.Invite.create({
            project_id: project.id,
            approved_id: project.create_user.id,
            invitee_id: userId,
            status: 0,
            approve_time: null
        })
    }
    //  拉取用户管理的项目审批列表
    async list1(projectid, userId) {
        const { ctx } = this
        const invites = await ctx.model.Invite.findAll({
            where: {
                project_id: projectid,
                approved_id: userId
            },
            attributes: [
                'id',
                'status',
                'create_time',
                'approve_time',
                'project_id',
                [literal('user.username'), 'name'] // 重命名字段为 'username'
            ],
            include: {
                model: ctx.model.User,
                attributes: []
            },
            order: [['create_time', 'ASC']],
            raw: true
        })
        return invites
    }
    //  拉取用户申请列表
    async list2(userId) {
        const { ctx } = this
        const invites = await ctx.model.Invite.findAll({
            where: {
                invitee_id: userId
            },
            attributes: [
                'id',
                'status',
                'create_time',
                'approve_time',
                'project_id',
                [literal('`Project`.`projectname`'), 'projectname']
            ],
            include: {
                model: ctx.model.Project,
                attributes: [] // 空数组表示不获取其他属性
            },
            order: [['create_time', 'ASC']],
            raw: true// 获取原始数据
        })
        return invites
    }
    // 添加一条用户申请加入组织记录
    async update(id, status, userId) {
        const record = await this.ctx.model.Invite.findByPk(id)
        const recordresult = record.toJSON()
        if (!recordresult || recordresult.approved_id !== userId || recordresult.status !== 0) {
            const error = new Error('修改失败')
            error.status = 500
            throw error
        }
        record.status = status
        await record.save()
    }
}
module.exports = InviteService
