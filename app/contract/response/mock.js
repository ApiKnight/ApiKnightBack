'use strict'
module.exports = {
  ResponseApiForReal: {
    code: { type: 'number', example: 200, description: '状态码' },
    message: { type: 'string', example: '请求成功', description: '描述信息' }
  },
  ResponseCreateMock: {
    code: { type: 'number', example: 200, description: '状态码' },
    message: { type: 'string', example: '创建成功', description: '描述信息' }
  },
  ResponseMockList: {
    code: { type: 'number', example: 200, description: '状态码' },
    message: { type: 'string', example: '查询成功', description: '描述信息' },
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID' },
        project_id: { type: 'number', description: '项目ID' },
        method: { type: 'string', description: '请求方法' },
        url: { type: 'string', description: '请求URL' },
        response: { type: 'string', description: '响应' },
        headers: { type: 'string', description: '请求头' },
        params: { type: 'string', description: '请求参数' },
        data: { type: 'string', description: '响应数据' },
        apis_id: { type: 'string', description: 'apis表id' },
        name: { type: 'string', description: '名称' }
      }
    }
  }
}
