'use strict'

// const pathToRegexp = require('path-to-regexp')
// const allMethods = [ 'get', 'post', 'put', 'delete' ]

module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)

    // 直接运行
    subRouter.post('/v1/mock/real', controller.mock.requestForReal)

    // // mock data
    // const urlRegexp = pathToRegexp('/v1/mockByUrl/:url*', [])
    // allMethods.forEach(method => {
    //     subRouter[method](urlRegexp, controller.mock.mockByUrl)
    // })

    // const mockUrl = pathToRegexp('/v1/mock/:id/:url*', [])
    // allMethods.forEach(method => {
    //     subRouter[method](mockUrl, controller.mock.mock)
    // })
}