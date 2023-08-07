'use strict'
const Service = require('egg').Service

class ApisService extends Service {
    // 新增api
    async create(userId, name, folder_id, request_data, response_data, project_id, description) {
        try {
            // 创建api
            const newApis = await this.ctx.model.Apis.create({
                folder_id,
                name,
                request_data,
                response_data,
                project_id,
                description,
                create_user: userId,
                operate_user: userId
            })
            const apiresult = newApis.toJSON()
            // 增加一个初始化历史版本记录
            // 新增历史纪录
            await this.ctx.service.version.create({
                apis_id: apiresult.id, userId, request_data, response_data, description, name, notes: '首次创建'
            })
            return apiresult
        } catch (error) {
            const er = new Error('服务器错误')
            er.status = 500
            throw er
        }

    }
    async getApiById(id) {
        const resultinfo = await this.ctx.model.Apis.findOne({ where: { id } })
        if (!resultinfo) {
            const error = new Error('未知错误')
            error.status = 500
            throw error
        }
        return resultinfo.toJSON()
    }
    // 删除api
    async delete(id) {
        // 删除项目
        const rowsDeleted = await this.ctx.model.Apis.destroy({
            where: {
                id
            }
        })
        if (rowsDeleted === 0) {
            const err = new Error('未知错误')
            err.status = 500
            throw err
        }
    }
    // 更改api
    async update(userId, apis_id, folder_id, response_data, request_data, description, name) {
        const { Apis } = this.ctx.model
        // 尝试查找匹配的记录
        const api = await Apis.findByPk(apis_id)
        if (!api) {
            const err = new Error('未知错误')
            err.status = 500
            throw err
        }
        // 更新记录
        const currentDate = new Date()
        try {
            await api.update({
                folder_id,
                response_data,
                request_data,
                description,
                name,
                operate_time: currentDate,
                operate_user: userId
            })
        } catch (error) {
            const err = new Error('未知错误')
            err.status = 500
            throw err
        }
    }
    async getApiByProjectId(project_id) {
        const apis = await this.ctx.model.Apis.findAll({
            where: {
                project_id
            }
        })
        return apis
    }
}

module.exports = ApisService
