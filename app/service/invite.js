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
                [ literal('user.username'), 'name' ] // 重命名字段为 'username'
            ],
            include: {
                model: ctx.model.User,
                attributes: []
            },
            order: [[ 'create_time', 'ASC' ]],
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
                [ literal('`Project`.`projectname`'), 'projectname' ]
            ],
            include: {
                model: ctx.model.Project,
                attributes: [] // 空数组表示不获取其他属性
            },
            order: [[ 'create_time', 'ASC' ]],
            raw: true// 获取原始数据
        })
        return invites
    }
    // 修改审批状态
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
    async getInvitedataById(id) {
        const resultinfo = await this.ctx.model.Invite.findOne({ where: { id } })
        if (!resultinfo) {
            const error = new Error('未知错误')
            error.status = 500
            throw error
        }
        return resultinfo.toJSON()
    }
    async checkExist(projectId, userId) {
        const { ctx } = this
        const count = await ctx.model.Invite.count({
            where: {
                project_id: projectId,
                invitee_id: userId,
                status: { $ne: 0 } // 只查询非待审批状态的记录
            }
        })
        if (count > 0) {
            const error = new Error('存在待审批记录')
            error.status = 500
            throw error
        }
    }
}
module.exports = InviteService
