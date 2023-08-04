'use strict'

/**
 * 路由配置
 */

// app/router.js
module.exports = app => {
  require('./routers/user.js')(app)
  require('./routers/project.js')(app)
  require('./routers/invite.js')(app)
}
