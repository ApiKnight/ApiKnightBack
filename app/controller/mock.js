'use strict'

const Controller = require('egg').Controller
const axios = require('axios')
const buildExampleFromSchema = require('mocker-dsl-core/lib/buildExampleFromSchema')
const BASE_TYPES = [ 'string', 'number', 'boolean', 'object', 'array' ]

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

     /**
         * @summary 创建Mock服务
         * @description 传入url, method, params, data, header参数,发送请求
         * @router post /v1/mock/create
         * @request body RequestApiForReal
         * @response 200 ResponseApiForReal 请求成功
         * @response 400 ErrorResponse 参数问题
         */
      async create() {
        const { service, helper, request, validate, rule, app } = this.ctx
        const { url, method, data, headers, response, params, project_id, api_id } = request.body
        try {
          // 参数校验
          const passed = await validate.call(this, rule.RequestCreateMock, request.body)
          if (!passed) {
              const err = new Error('参数验证错误')
              err.status = 400
              throw err
          }
          // 获取请求用户ID
          const userId = this.ctx.state.user.id
          // 看看他有没有创建的资格
          const isresult = await service.members.validate_permissions(userId, project_id, app.config.member)
          if (!isresult) {
              const err = new Error('无权操作')
              err.status = 403
              throw err
          }
          // 尝试创建
          await service.mock.create(url, method, data, headers, response, params, project_id, api_id)
          helper.success(null, '创建成功')
      } catch (err) {
          helper.error(err.status, err.message)
      }
      }

    // mock
    async mock() {
      const apiDoc = await this.findApi()
      await this.handleMock(this.ctx.method.toLowerCase(), apiDoc)
    }

    // Todo
    async findApi() {
      const method = this.ctx.method.toLowerCase()
      // 对应的 id 和 url
      const id = this.ctx.params[0]
      const url = this.ctx.params[1]
      // 先在项目中查找
      if (await this.ctx.model.Project.findOne({ id })) {
        // 接口路径模式
        // 首先进行全匹配，只允许前面多个/ 没有参数
        const fullReg = new RegExp(`^/?${url}$`)
        let res = await this.ctx.model.Mock.findOne({ url: fullReg, project_id: id, method })
        res.params = JSON.parse(res.params)
        res.header = JSON.parse(res.header)
        res.response = JSON.parse(res.response)
        if (!res) {
          // 全匹配未找到，则进行restful路径参数匹配，如/api/:id
          // url中每个位置都全匹配或匹配路径参数，((api)|(:.*))
          let regex = `/${url}`.replace(/(?<=\/).*?((?=(\/))|$)/g, (...args) => `((${args[0]})|(:[^\/]*))`)
          regex = `^${regex}$`
          res = await this.ctx.model.Mock.findOne({ url: { $regex: regex }, project_id: id, method })
          res.params = JSON.parse(res.params)
          res.header = JSON.parse(res.header)
          res.response = JSON.parse(res.response)
        }
        return res
      }
      // // 找不到直接查找api_id  纯hash模式api，全匹配
      // const res = this.ctx.model.Mock.findOne({ api_id: id })
      // res.params = JSON.parse(res.params)
      // res.header = JSON.parse(res.header)
      // res.response = JSON.parse(res.response)
      // return res
    }

    // 处理mock
    async handleMock(method, apiDoc) {
      if (!apiDoc) {
        return
      }
      if (apiDoc.method !== method) {
        this.ctx.status = 405
        return
      }
      // 校验参数
      // await this.validateParams(apiDoc)
      this.ctx.body = this.getResponse(apiDoc) || {}
    }

    // 获取mock响应
    getResponse(apiDoc) {
      if (apiDoc.response) {
      const schema = apiDoc.response
      // 模拟异常请求
      let { status, statusText } = schema
      status = parseInt(status || 200)
      if (isNaN(status) || status < 100) {
        this.ctx.status = 500
        return { message: 'Status Code不正确' }
      } else if (status !== 200) {
        this.ctx.status = status
        return { message: statusText || '请求异常' }
      }
      return buildExampleFromSchema(schema)
    }
      return {}
    }

     // 参数校验
     async validateParams(apiDoc) {
      const data = {
        query: this.ctx.request.query,
        body: this.ctx.request.body,
        headers: this.ctx.request.headers
      }


      const { params, method, headers } = apiDoc
      delete apiDoc.params.path
      const headersParams = headers.params || []
      params.headers = headersParams
      const headersMap = {}
      headersParams.forEach(item => {
        if (item && item.key) {
          headersMap[item.key.toLowerCase()] = item.example
        }
      })

      for (const name in params) {
        const rule = {}
        // get请求不校验body
        // if (method === 'get' && name === 'body') continue
        params[name].forEach(param => {
          // 参数不必填 && 发送的值为空字符串, 不校验
          if (!param.required) {
            const value = data[name] ? data[name][param.key] : ''
            if (!value) return
          }
          // 参数不存在 || 参数类型不属于基本类型，不校验
          if (!param.key || BASE_TYPES.indexOf(param.type) === -1) return
          if (name === 'headers') {
            const newKey = param.key.toLowerCase()
            const headerValue = headersMap[newKey]
            if (headerValue) {
              rule[newKey] = {
                type: 'string',
                required: true,
                format: new RegExp(headerValue)
              }
            }
          } else {
            let validateObj = {}
            validateObj = {
              type: this.getValidatorType(name, param.type),
              required: param.required,
              allowEmpty: param.type === 'string'
            }
            // 最大值校验
            const { maxLength } = param
            if (param.type === 'string' && maxLength > 0) {
              validateObj.max = maxLength
            }
            rule[param.key] = validateObj
          }
        })
        this.ctx.validate(rule, data[name])
      }
    }
}

module.exports = MockController

