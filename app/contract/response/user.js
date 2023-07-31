'use strict'

module.exports = {
  ResponseLogin: {
    code: { type: 'number', example: 200, description: '状态码' },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: '用户 ID' },
            username: { type: 'string', description: '用户名' },
            email: { type: 'string', description: '邮箱' },
            phone: { type: 'string', description: '手机号码' },
            avatar_url: { type: 'string', description: '头像地址' },
          }
        },
        token: { type: 'string', description: 'token信息' },
      },
    },
    message: { type: 'string', example: '登录成功', description: '描述信息' },
  },
  ResponseUpdate: {
    code: { type: 'number', example: 200, description: '状态码' },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: '用户 ID' },
            username: { type: 'string', description: '用户名' },
            email: { type: 'string', description: '邮箱' },
            phone: { type: 'string', description: '手机号码' },
            avatar_url: { type: 'string', description: '头像地址' },
          }
        }
      },
    },
    message: { type: 'string', example: '更新成功', description: '描述信息' },
  },
  ResponseLoginFailed: {
    code: { type: 'number', example: 401, description: '状态码' },
    message: { type: 'string', example: '用户名错误/密码错误', description: '错误信息' },
  },
  ResponseRegister: {
    code: { type: 'number', example: 200, description: '状态码' },
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '用户 ID' },
        username: { type: 'string', description: '用户名' },
        email: { type: 'string', description: '邮箱' },
        phone: { type: 'string', description: '手机号码' },
        avatar_url: { type: 'string', description: '头像地址' },
      },
    },
    message: { type: 'string', example: '注册成功', description: '描述信息' },
  },
  ResponsecheckExist: {
    code: { type: 'number', example: 200, description: '状态码' },
    message: { type: 'string', example: ' 未注册', description: '成功信息' },
  },
  ErrorResponse: {
    code: { type: 'number', example: 400, description: '状态码' },
    message: { type: 'string', example: '请求参数错误', description: '错误信息' },
  },
  ErrorResponseAlreadyRegistered: {
    code: { type: 'number', example: 409, description: '状态码' },
    message: { type: 'string', example: '邮箱已被注册/用户名已经被注册了', description: '错误信息' },
  },
  ErrorResponseUnauthorized: {
    code: { type: 'number', example: 601, description: '状态码' },
    message: { type: 'string', example: '需要登录才能访问该资源', description: '错误信息' },
  }
}
