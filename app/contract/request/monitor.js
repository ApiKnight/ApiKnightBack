'use strict'
module.exports = {
  RequestMonitorUpload: {
    url: { type: 'string', required: true, description: 'url', message: 'url' },
    type: { type: 'string', required: true, description: '监控数据类型', message: '监控数据类型' },
    message: { type: 'string', required: true, description: '具体内容', message: '具体内容' }
  }
}
