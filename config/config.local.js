/* eslint-disable no-unused-vars */
'use strict'

/**
 * 本地环境
 */

module.exports = app => {
  const config = {}

  config.sequelize = {
    // 连接用户
    username: 'root',
    // 连接密码
    password: '123456',
    // 连接的数据库，可根据需要改成已有的数据库
    database: 'test-egg',
    // 连接地址
    host: '127.0.0.1',
    // 数据库类型
    dialect: 'mysql'
  }

  return config
}
