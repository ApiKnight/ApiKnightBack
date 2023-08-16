'use strict'
const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const Phone = /^1[3|4|5|8][0-9]\d{8}$/
module.exports = {
  RequestLogin: {
    usernameOrEmail: { type: 'string', required: true, description: '邮箱或者用户名', message: '邮箱或者用户名不能为空' },
    password: { type: 'string', required: true, description: '密码', message: '密码不能为空' }
  },
  RequestRegister: {
    username: { type: 'string', required: true, description: '用户名' },
    email: { type: 'string', required: true, pattern: Email, description: '邮箱' },
    password: { type: 'string', required: true, description: '用户密码' },
    phone: { type: 'string', required: true, description: '手机号', pattern: Phone },
    avatar_url: { type: 'string', required: true, description: '用户头像' }
  },
  RequestUpdateUser: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email },
    phone: { type: 'string', required: false, pattern: Phone },
    avatar_url: { type: 'string', required: false, description: '用户头像' }
  },
  RequestcheckExist: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email },
    phone: { type: 'string', required: false, pattern: Phone }
  },
  RequestsearchUsersByEmail: {
    email: { type: 'string', required: false }
  },
  RequestUserInfo: {
    user_id: { type: 'string', required: true, description: '用户id', message: '用户id' }
  }
}
