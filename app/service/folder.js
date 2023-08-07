'use strict'
const Service = require('egg').Service

class FolderService extends Service {
    async create(parent_id, name, project_id) {
        try {
            // 创建文件夹
            const newFolder = await this.ctx.model.Folder.create({
                parent_id,
                name,
                project_id
            })
            return newFolder.toJSON()
        } catch (error) {
            const er = new Error('服务器错误')
            er.status = 500
            throw er
        }

    }
    // 检查folder文件夹是不是在所属项目里
    async checkFolderInProject(folder_id, project_id) {
        console.log(folder_id, project_id)
        // 检查文件夹是否属于项目
        const folder = await this.ctx.model.Folder.findOne({
            where: {
                id: folder_id,
                project_id
            }
        })
        if (!folder) {
            const er = new Error('参数问题')
            er.status = 400
            throw er
        }
    }
    // 通过id查询文件夹内容
    async getFolderByid(folder_id) {
        // 检查文件夹是否属于项目
        const folder = await this.ctx.model.Folder.findOne({
            where: {
                id: folder_id
            }
        })
        if (!folder) {
            const er = new Error('参数问题')
            er.status = 400
            throw er
        }
        return folder.toJSON()
    }
    // 更改文件夹信息
    async update(folder_id, parent_id, name) {
        // 更新文件夹
        const [affectedCount] = await this.ctx.model.Folder.update({ parent_id, name }, { where: { id: folder_id } })
    }
    // 删除文件夹包括里面的api和版本信息
    async delete(folder_id) {
        // 删除这个文件夹
        const { ctx } = this
        const Folder = ctx.model.Folder
        const folder = await Folder.findByPk(folder_id)
        if (!folder) {
            const er = new Error('参数问题')
            er.status = 400
            throw er
        }
        await folder.destroy()
        const Api = ctx.model.Apis
        const Version = ctx.model.Version
        const apis = await Api.findAll({
            where: {
                folder_id
            },
            include: Version
        })
        for (const api of apis) {
            for (const version of api.versions) {
                await version.destroy()
            }
            await api.destroy()
        }
    }
    async getFolderByProjectId(project_id) {
        const FolderList = await this.ctx.model.Folder.findAll({
            where: {
                project_id
            }
        })
        return FolderList
    }
}
module.exports = FolderService
