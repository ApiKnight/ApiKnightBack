'use strict'
const Service = require('egg').Service

class MockService extends Service {
   // 创建mock服务
   async create(project_id, method, url, response, headers, params, data, apis_id, name) {
    try {
        // 创建api
        const newMock = await this.ctx.model.Mock.create({
            project_id,
            method,
            url,
            response,
            headers,
            params,
            data,
            apis_id,
            name
        })
        const mockresult = newMock.toJSON()
        return mockresult
    } catch (error) {
        const er = new Error('服务器错误')
        er.status = 500
        throw er
    }

  }
   // 拉取apis_id的mock服务
   async selectMockListByApisId(apis_id) {
    const mocklist = await this.ctx.model.Mock.findAll({
        where: {
            apis_id
        }
    })
    return mocklist
  }

}

module.exports = MockService
