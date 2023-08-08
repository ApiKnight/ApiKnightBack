'use strict'
const Service = require('egg').Service
class ProjectService extends Service {
    // 创建项目
    async create({ projectname, description, create_user }) {
        // 创建项目
        const newProject = await this.ctx.model.Project.create({
            projectname,
            description,
            create_user
        })
        const project = newProject.toJSON()
        // 格式化日期
        project.create_time = this.ctx.helper.formatTime(project.create_time)
        // 添加创建者到项目members赋予角色创建者1111
        await this.ctx.model.Members.create({
            project_id: project.id,
            user_id: create_user,
            role: 1111
        })
        return project
    }
    // 判断用户是不是项目的所有者
    async isOwner(projectId, userId) {
        const { ctx } = this
        // 查询用户是否在项目中，并且拥有所有者角色
        const member = await ctx.model.Members.findOne({
            where: {
                project_id: projectId,
                user_id: userId
            }
        })
        if (!member) {
            const err = new Error('项目不存在')
            err.status = 400
            throw err
        } else {
            const memberresult = member.toJSON()
            if (memberresult.role !== 1111) {
                const err = new Error('无权操作,不是项目所有者')
                err.status = 403
                throw err
            }
        }
    }
    // 删除项目
    async delete({ projectid }) {
        // 删除项目
        const rowsDeleted = await this.ctx.model.Project.destroy({
            where: {
                id: projectid
            }
        })
        // 删除项目的成员信息
        const membersDeleted = await this.ctx.model.Members.destroy({
            where: {
                project_id: projectid
            }
        })
        // 删除项目里的api内容
        // 删除api内容里的历史信息
        // 处理删除操作的结果
        if (rowsDeleted === 0 || membersDeleted === 0) {
            const err = new Error('删除失败,联系管理员')
            err.status = 500
            throw err
        }
    }
    // 更新项目信息
    async update({ projectid, description, projectname }) {
        // 执行更新操作
        const result = await this.ctx.model.Project.update({
            description,
            projectname
        }, {
            where: {
                id: projectid
            }
        })
        return result
    }
    // 通过projectid查询项目信息
    async getByProjectId(projectid) {
        let project = await this.ctx.model.Project.findOne({
            where: {
                id: projectid
            }
        })
        project = project.toJSON()
        if (!project) {
            const err = new Error('参数错误')
            err.status = 400
            throw err
        }
        project.create_user = await this.ctx.service.user.getUserById(project.create_user)
        return project
    }
}
module.exports = ProjectService
