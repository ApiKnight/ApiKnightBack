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
}

module.exports = MockController

