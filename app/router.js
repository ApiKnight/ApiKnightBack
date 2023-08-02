'use strict'

/**
 * 路由配置
 */

// app/router.js
module.exports = app => {
  require('./routers/user.js')(app)
}
