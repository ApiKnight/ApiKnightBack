'use strict'
module.exports = {
  RequestApiForReal: {
    url: { type: 'string', required: true, description: '请求的URL', message: '请求的URL不能为空' },
    method: { type: 'string', required: true, enum: [ 'GET', 'POST', 'PUT', 'DELETE' ], description: '请求的METHOD', message: '请求的METHOD不能为空' },
    params: { type: 'object', required: false, description: '请求的参数对象', message: '' },
    data: { type: 'object', required: false, description: '响应的数据对象', message: '' },
    header: { type: 'object', required: false, description: '请求的头部信息对象', message: '' }
  },
  RequestCreateMock: {
    project_id: { type: 'number', required: true, description: '项目表id', message: '' },
    url: { type: 'string', required: true, description: '请求的URL', message: '请求的URL不能为空' },
    method: { type: 'string', required: true, enum: [ 'GET', 'POST', 'PUT', 'DELETE' ], description: '请求的METHOD', message: '请求的METHOD不能为空' },
    response: { type: 'string', required: true, description: '响应', message: '' },
    headers: { type: 'string', required: false, description: '请求的头部信息对象', message: '' },
    params: { type: 'string', required: false, description: '请求的参数对象', message: '' },
    data: { type: 'string', required: false, description: '响应的数据对象', message: '' },
    apis_id: { type: 'string', required: true, description: 'apis表id', message: '' },
    name: { type: 'string', required: true, description: '名称', message: '' }
  },
  RequestMockList: {
    apis_id: { type: 'string', required: true, description: 'apis表id', message: '' }
  }
}
