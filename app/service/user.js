'use strict'
const Service = require('egg').Service
const moment = require('moment')
// Service
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

class UserService extends Service {
  // // 登录
  // async login(values) {
  //   const { model } = this.ctx

  //   // 组装用户查询参数
  //   const where = {}
  //   if (values.unionId) {
  //     where.unionId = values.unionId
  //   } else {
  //     where.openId = values.openId
  //   }
  //   return await model.User.findOne({ where, attributes })
  //     .then(async user => {
  //       const loggedAt = moment().format('YYYY-MM-DD HH:mm:ss')
  //       values.loggedAt = loggedAt
  //       // 如果找到了用户更新用户信息
  //       if (user) {
  //         await user.update(values, { where: { id: user.id } })
  //       } else {
  //         // 否则新增一个用户
  //         user = await model.User.create(values)
  //       }
  //       // 返回用户信息
  //       const data = user.toJSON()
  //       data.loggedAt = loggedAt
  //       delete data.updatedAt
  //       return data
  //     })
  // }

  // // 保存手机号码
  // async savePhone(id, phone) {
  //   const { model } = this.ctx

  //   return await model.User.findOne({
  //     where: { id },
  //     attributes: [ 'id', 'phone' ]
  //   })
  //     .then(async user => {
  //       if (user) {
  //         const loggedAt = moment().format('YYYY-MM-DD HH:mm:ss')
  //         await user.update({ phone, loggedAt })
  //         // 返回用户信息
  //         const data = user.toJSON()
  //         data.loggedAt = loggedAt
  //         delete data.updatedAt
  //         return data
  //       }
  //       return false
  //     })
  // }

  // // 获取用户信息
  // async info(id) {
  //   const { model } = this.ctx

  //   return await model.User.findOne({
  //     where: { id },
  //     attributes
  //   })
  //     .then(async user => {
  //       if (user) {
  //         // 更新登录时间
  //         const loggedAt = moment().format('YYYY-MM-DD HH:mm:ss')
  //         await user.update({ loggedAt })
  //         // 返回用户信息
  //         const data = user.toJSON()
  //         data.loggedAt = loggedAt
  //         delete data.updatedAt
  //         return data
  //       }
  //       return false
  //     })
  // }
  // 获取用户信息
  async info() {
    const userId = this.ctx.state.user.id
    const resultinfo = await this.ctx.model.User.findOne({ where: { id: userId } })
    // 从返回结果中删除 password 字段
    const { password: _, ...result } = resultinfo.toJSON()
    return result
  }
  async create({ username, email, password, phone, avatar_url }) {
    // 检查邮箱是否已经被注册
    const existingUserByemail = await this.isEmailRegistered(email)
    if (existingUserByemail) {
      const err = new Error('邮箱已被注册')
      err.status = 409
      throw err
    }
    // 检查用户名是否已经被注册
    const existingUserByname = await this.isUsernameRegistered(username)
    if (existingUserByname) {
      const err = new Error('用户名已被注册了')
      err.status = 409
      throw err
    }
    // 创建新用户
    const newUser = await this.ctx.model.User.create({
      username,
      email,
      password,
      phone,
      avatar_url
    })

    // 从返回结果中删除 password 字段
    const { password: _, ...result } = newUser.toJSON()
    // 返回结果
    return result
  }
  async login({ usernameOrEmail, password }) {
    // 引入密码加密和验证的扩展方法
    const { verifyPassword } = this.ctx
    // 查询用户
    const user = await this.ctx.model.User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    })
    // 查不到
    if (!user) {
      const error = new Error('账号输入错误')
      error.status = 401
      throw error
    }
    const userObject = user.toJSON()


    // 验证密码
    const isPasswordValid = await verifyPassword(password, userObject.password)
    if (!isPasswordValid) {
      const error = new Error('密码输入错误')
      error.status = 401
      throw error
    }

    // 生成 JWT token
    const token = jwt.sign({
      id: userObject.id
    }, this.app.config.jwt.secret, {
      expiresIn: '2h'
    })
    // 返回用户信息和 token
    return { userObject, token }
  }
  async update(id, { username, email, phone, password }) {
    if (email) {
      // 检查邮箱是否已经被注册
      const existingUserByemail = await this.isEmailRegistered(email)
      if (existingUserByemail) {
        const err = new Error('邮箱已被注册')
        err.status = 409
        throw err
      }
    }
    if (username) {
      // 检查用户名是否已经被注册
      const existingUserByname = await this.isUsernameRegistered(username)
      if (existingUserByname) {
        const err = new Error('用户名已被注册了')
        err.status = 409
        throw err
      }
    }
    if (phone) {
      // 检查手机是否已经被注册
      const existingUserByphone = await this.isPhoneRegistered(phone)
      if (existingUserByphone) {
        const err = new Error('手机号已被注册了')
        err.status = 409
        throw err
      }
    }
    if (password) {
      password = await this.ctx.hashPassword(password)
    }
    // 更新用户信息
    const [ affectedCount ] = await this.ctx.model.User.update({ username, email, phone, password }, { where: { id } })
    if (affectedCount === 1) {
      // 更新成功，查询更新后的用户信息
      const updatedUser = await this.ctx.model.User.findOne({ where: { id } })
      return updatedUser
    }
    const err = new Error('更新失败')
    err.status = 400
    throw err
  }
  // 查询是否已经存在该用户名
  async isUsernameRegistered(username) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ where: { username } })
    return !!user
  }
  // 查询邮箱是不是已经被注册
  async isEmailRegistered(email) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ where: { email } })
    return !!user
  }
  // 查询电话是不是已经被注册
  async isPhoneRegistered(phone) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ where: { phone } })
    return !!user
  }
}
module.exports = UserService
