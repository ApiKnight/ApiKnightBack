'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller
/**
 * @controller Test模块
 */
class TestController extends Controller {
    async swaggerdoc() {
        const filePath = path.join('app/public', 'a.json')
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        const jsonData = JSON.parse(fileContent)

        this.ctx.body = jsonData
        this.ctx.set('Content-Type', 'application/json')
    }
}

module.exports = TestController
