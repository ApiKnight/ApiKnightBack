'use strict'
const Service = require('egg').Service
// Service
class VersionService extends Service {
    // 不需要鉴权 前面在创建api的时候已经做过了
    async create({ apis_id, userId: operate_user, request_data, response_data, description, name, notes }) {
        // 新增历史纪录
        const newVersion
            = await this.ctx.model.Version.create({
                apis_id, operate_user, request_data, response_data, description, name, notes
            })
        return newVersion.toJSON()
    }
    // 拉取一个apis的历史版本记录
    async selectVersionListByApisId(apis_id) {
        const versionlist = await this.ctx.model.Version.findAll({
            where: {
                apis_id
            }
        })
        return versionlist
    }

    // 通过versionid查询version记录
    async selectVersionById(version_id) {
        const version = await this.ctx.model.Version.findOne({
            where: {
                id: version_id
            }
        })
        // 查不到
        if (!version) {
            const error = new Error('参数错误')
            error.status = 400
            throw error
        }
        return version.toJSON()
    }

    // 通过apis_id删除相关的历史记录
    async deleteVersionByApisId(apis_id) {
        const result = await this.ctx.model.Version.destroy({
            where: {
                apis_id
            }
        })
        if (result === 0) {
            const error = new Error('删除失败')
            error.status = 500
            throw error
        }
    }
}
module.exports = VersionService
