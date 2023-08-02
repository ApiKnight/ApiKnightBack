'use strict'
const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
module.exports = {
  RequestLogin: {
    usernameOrEmail: { type: 'string', required: true, description: '邮箱或者用户名', message: '邮箱或者用户名不能为空' },
    password: { type: 'string', required: true, description: '密码', message: '密码不能为空' }
  },
  RequestRegister: {
    username: { type: 'string', required: true, description: '用户名' },
    email: { type: 'string', required: true, pattern: Email, description: '邮箱' },
    password: { type: 'string', required: true, description: '用户密码' },
    phone: { type: 'string', required: true, description: '手机号' },
    avatar_url: { type: 'string', required: true, description: '用户头像' }
  },
  RequestUpdateUser: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email },
    phone: { type: 'string', required: false }
  },
  RequestcheckExist: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email },
    phone: { type: 'string', required: false }
  }
}
