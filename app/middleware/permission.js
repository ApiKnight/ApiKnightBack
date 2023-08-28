'use strict'
const jwt = require('jsonwebtoken')
/**
 * 用户是否已登录判断和异常捕获处理
 * @param {*} options 中间件的配置项，框架会将 app.config.middlewareName 传递进来
 * @param {*} app Application 实例
 */
module.exports = (options, app) => {
  return async (ctx, next) => {
    const whiteUrls = options.whiteUrls || []
    // 如果 ctx.url 在白名单中
    let isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl))
    // 特殊情况
    const reg = new RegExp('^/api/v1/mock/[0-9]+')
    if (reg.test(ctx.url)) isWhiteUrl = true
    console.log('isWhiteUrl', isWhiteUrl, ctx.url, ctx.app.config.apiPrefix)
    // ctx.url.match(new RegExp(`^${config.apiPrefix}`))
    if (isWhiteUrl || !ctx.url.match(new RegExp(`^${ctx.app.config.apiPrefix}`))) {
      await next()
    } else {
      // 前端放在请求头的token内容
      const authorization = ctx.request.header.authorization
      if (!authorization) {
        ctx.helper.notLogged()
        return
      }
      const token = authorization.split(' ')[1]
      try {
        const decoded = jwt.verify(token, ctx.app.config.jwt.secret)
        ctx.state.user = decoded
        await next()
      } catch (err) {
        ctx.helper.nopermission()
      }
    }
  }
}
