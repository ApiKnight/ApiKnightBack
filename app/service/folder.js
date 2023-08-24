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
        try {
            const { ctx } = this
            const Folder = ctx.model.Folder
            const Api = ctx.model.Apis
            const Version = ctx.model.Version
            const folder = await Folder.findByPk(folder_id)
            if (!folder) {
                const er = new Error('参数问题')
                er.status = 400
                throw er
            }
            await folder.destroy()
            const apis = await Api.findAll({
                where: {
                    folder_id
                },
                include: Version
            })
            const deleteApiPromises = apis.map(async (api) => {
                const versions = api.versions
                const deleteVersionPromises = versions.map((version) => version.destroy())
                await Promise.all(deleteVersionPromises)
                await api.destroy()
            })
            await Promise.all(deleteApiPromises)
            const folderlist = await Folder.findAll({
                where: {
                    parent_id: folder_id
                }
            })
            const deleteFolderPromises = folderlist.map((folder) => this.delete(folder.id))
            await Promise.all(deleteFolderPromises)
        } catch (error) {
            // 将错误抛出到调用方进行处理
            throw error
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
    async queryrootfolderid(project_id) {
        // 检查文件夹是否属于项目
        const folder = await this.ctx.model.Folder.findOne({
            where: {
                project_id,
                name: '根目录'
            }
        })
        if (!folder) {
            const er = new Error('参数问题')
            er.status = 400
            throw er
        }
        return folder.toJSON()
    }
}
module.exports = FolderService
