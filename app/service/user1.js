'use strict'

const Service = require('egg').Service
const moment = require('moment')

// 用户信息要返回的字段
const attributes = ['id', 'name', 'age', 'created_at', 'updated_at']

class UserService extends Service {
    // 获取用户信息
    async info(id) {
        const { model } = this.ctx
        return model.User1.findAll({ where: { id: 1 } });
    }
}

module.exports = UserService
