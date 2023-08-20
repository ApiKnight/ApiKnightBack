'use strict'

const Controller = require('egg').Controller
const axios = require('axios')

/**
 * @controller Mock模块
 */
class MockController extends Controller {
    /**
         * @summary 直接运行api
         * @description 传入url, method, params, data, header参数,发送请求
         * @router post /v1/mock/real
         * @request body RequestApiForReal
         * @response 200 ResponseApiForReal 请求成功
         * @response 400 ErrorResponse 参数问题
         * @response 403 ForbiddenError 无权
         * @response 401 ErrorResponseUnauthorized 未登录
         * @response 500 InternalServerError 未知错误
         */
    async requestForReal() {
      const { helper, rule, request, validate } = this.ctx
      const { url, method, params, data, header } = request.body
      try {
        // 参数校验
        const passed = await validate.call(this, rule.RequestApiForReal, request.body)
        if (!passed) {
          const err = new Error('参数验证错误')
          err.status = 400
          throw err
        }
        // 不支持回环地址
        const isLocalhost = url.indexOf('127.0.0.1') > -1 || url.indexOf('localhost') > -1
        if (isLocalhost) {
          const err = new Error('禁止使用回环地址')
          err.status = 400
          throw err
        }

        // 解析url，合并query参数
        const parsedUrl = new URL(url)
        const urlSearchParams = new URLSearchParams(parsedUrl.search)
        const urlQueryParams = Object.fromEntries(urlSearchParams.entries())
        const finalParams = { ...urlQueryParams, ...params }

        // 进行请求转发
        const response = await axios({
          url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname,
          method,
          data: request.body,
          params: finalParams,
          headers: header
        })

        this.ctx.body = response.data
        this.ctx.status = response.status
      } catch (err) {
        helper.error(err.status, err.message)
      }
    }

    // Todo
    async findApi() {
      const method = this.ctx.method.toLowerCase()
      // 组id或组prefix
      const id = this.ctx.params[0]
      const url = this.ctx.params[1]
      if (await this.ctx.model.Project.findOne({ _id: id })) {
        // 接口路径模式
        // 首先进行全匹配，只允许前面多个/
        const fullReg = new RegExp(`^/?${url}$`)
        let res = await this.ctx.model.mock.findOne({ url: fullReg, project: id, 'options.method': method })
        if (!res) {
          // 全匹配未找到，则进行restful路径参数匹配，如/api/:id
          // url中每个位置都全匹配或匹配路径参数，((api)|(:.*))
          let regex = `/${url}`.replace(/(?<=\/).*?((?=(\/))|$)/g, (...args) => `((${args[0]})|(:[^\/]*))`)
          regex = `^${regex}$`
          res = await this.ctx.model.mock.findOne({ url: { $regex: regex }, project: id, 'options.method': method })
        }
        return res
      }
        // 纯hash模式api，全匹配
        const res = this.ctx.model.mock.findOne({ _id: id, isDeleted: false })
        return res
    }
}

module.exports = MockController

