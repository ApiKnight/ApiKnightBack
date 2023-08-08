'use strict'
const Service = require('egg').Service
// Service
class VersionService extends Service {
    // 不需要鉴权 前面在创建api的时候已经做过了
    async create({ apis_id, userId: operate_user, request_data, response_data, description, name, notes }) {
        console.log({ apis_id, userId: operate_user, request_data, response_data, description, name, notes })
        // 新增历史纪录
        const newVersion
            = await this.ctx.model.Version.create({
                apis_id, operate_user, request_data, response_data, description, name, notes
            })
        return newVersion.toJSON()
    }
}
module.exports = VersionService
