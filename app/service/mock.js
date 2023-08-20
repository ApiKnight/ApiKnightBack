'use strict'
const Service = require('egg').Service

class MockService extends Service {
  // // 根据请求路径从数据库中查找对应的接口文档对象
  // async findApi() {
  //   const { ctx } = this
  //   const method = ctx.method.toLowerCase()
  // }


}

module.exports = MockService
