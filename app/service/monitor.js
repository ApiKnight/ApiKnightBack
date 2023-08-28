'use strict'
const Service = require('egg').Service
// Service
class MonitorService extends Service {
    async upload({ url, type, message }) {
        // 创建监控内容
        await this.ctx.model.Monitor.create({
            url, type, message
        })
    }
}
module.exports = MonitorService
