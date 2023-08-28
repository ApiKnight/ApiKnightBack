'use strict'
module.exports = app => {
    const { router, controller } = app

    // 测试
    router.get('/swaggerdoc', controller.test.swaggerdoc)
}
