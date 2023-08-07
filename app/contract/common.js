'use strict'

/**
 * egg-swagger-doc 提供的接口文档配置，公共的 DTO 结构可以定义在这里
 * 可以在结构里面定义 message 等校验字段，然后用 ctx.rule.xxx 去校验请求数据。例如 ctx.validate(ctx.rule.Phone, ctx.request.query)
 * 更多 type 支持：https://github.com/yiminghe/async-validator
 */

module.exports = {
  // 通用的标签字段
  CommonLabelInfo: {
    value: { type: 'number', description: '字段值' },
    label: { type: 'string', description: '字段名称' }
  },
  // 通用的查询字段
  CommonQueryInfo: {
    id: { type: 'number', description: 'id' },
    name: { type: 'string', description: '名称' }
  },
  ErrorResponse: {
    code: { type: 'number', example: 400, description: '状态码' },
    message: { type: 'string', example: '请求参数错误', description: '错误信息' }
  },
  SuccessResponse: {
    code: { type: 'number', example: 200, description: '状态码' },
    message: { type: 'string', example: '请求成功', description: '成功信息' }
  },
  InternalServerError: {
    code: { type: 'number', example: 500, description: '状态码' },
    message: { type: 'string', example: '', description: '未知错误' }
  },
  ForbiddenError: {
    code: { type: 'number', example: 403, description: '状态码' },
    message: { type: 'string', example: '', description: '无权操作' }
  },
  ErrorResponseUnauthorized: {
    code: { type: 'number', example: 401, description: '状态码' },
    message: { type: 'string', example: '未登录', description: '错误信息' }
  }
}
