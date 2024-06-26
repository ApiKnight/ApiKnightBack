'use strict'

/**
 * 生产环境
 */

const os = require('os')

module.exports = app => {
  const config = {}

  config.sequelize = {
    // 连接用户
    username: 'root',
    // 连接密码
    password: '123456',
    // 连接的数据库，可根据需要改成已有的数据库
    database: 'node_egg',
    // 连接地址
    host: '127.0.0.1',
    // 数据库类型
    dialect: 'mysql'
  }

  // 自定义日志路径
  // https://eggjs.org/zh-cn/core/logger.html
  config.logger = {
    dir: `${os.homedir()}/logs/${app.name}`
  }

  return config
}
