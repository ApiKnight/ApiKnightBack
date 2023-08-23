'use strict'

const allMethods = [ 'get', 'post', 'put', 'delete' ]

module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)

    // 直接运行
    subRouter.post('/v1/mock/real', controller.mock.requestForReal)

    // 创建mock服务
    subRouter.post('/v1/mock/create', controller.mock.createMock)

    // // mock data
    // const urlRegexp = pathToRegexp('/v1/mock/mockByUrl/:url*', [])
    // allMethods.forEach(method => {
    //     subRouter[method](urlRegexp, controller.mock.mockByUrl)
    // })

    // const mockUrl = pathToRegexp('/v1/mock/:id/:url*', [])
    allMethods.forEach(method => {
        subRouter[method]('/v1/mock/:id/:url*', controller.mock.mock)
    })
}
