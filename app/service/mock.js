'use strict'
const Service = require('egg').Service

class MockService extends Service {
   // 创建mock服务
   async create(url, method, params, data, headers, response, project_id, api_id) {
    try {
        // 创建api
        const newMock = await this.ctx.model.Mock.create({
            url,
            method,
            params,
            data,
            headers,
            response,
            project_id,
            api_id
        })
        const mockresult = newMock.toJSON()
        return mockresult
    } catch (error) {
        const er = new Error('服务器错误')
        er.status = 500
        throw er
    }

}


}

module.exports = MockService
