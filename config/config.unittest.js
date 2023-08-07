/* eslint-disable no-unused-vars */
'use strict'

/**
 * 单元测试环境
 */

module.exports = app => {
  const config = {}

  config.sequelize = {
    // 连接用户
    username: 'node_egg',
    // 连接密码
    password: 'JHw2xb4BMfJkD3rZ',
    // 连接的数据库，可根据需要改成已有的数据库
    database: 'node_egg',
    // 连接地址
    host: '47.112.108.202',
    // 数据库类型
    dialect: 'mysql'
  }

  return config
}
