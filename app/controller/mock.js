'use strict'

const Controller = require('egg').Controller
const axios = require('axios')
const buildExampleFromSchema = require('mocker-dsl-core/lib/buildExampleFromSchema')
const { Op } = require('sequelize')

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
      const { request } = this.ctx
      const { url, method, params, data, header } = request.body
      // try {
      //   // 参数校验
      //   const passed = await validate.call(this, rule.RequestApiForReal, request.body)
      //   if (!passed) {
      //     const err = new Error('参数验证错误')
      //     err.status = 400
      //     throw err
      //   }
      //   // 不支持回环地址
      //   const isLocalhost = url.indexOf('127.0.0.1') > -1 || url.indexOf('localhost') > -1
      //   if (isLocalhost) {
      //     const err = new Error('禁止使用回环地址')
      //     err.status = 400
      //     throw err
      //   }

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
    }

     /**
         * @summary 创建Mock服务
         * @description 传入url, method, project_id, params, data, header参数,发送请求
         * @router post /v1/mock/create
         * @request body RequestCreateMock
         * @response 200 ResponseCreateMock 请求成功
         * @response 400 ErrorResponse 参数问题
         */
      async create() {
        const { service, helper, request, validate, rule } = this.ctx
        const { project_id, method, url, response, headers, params, data, apis_id, name } = request.body
        try {
          // 参数校验
          const passed = await validate.call(this, rule.RequestCreateMock, request.body)
          if (!passed) {
              const err = new Error('参数验证错误')
              err.status = 400
              throw err
          }
          // // 获取请求用户ID
          // const userId = this.ctx.state.user.id
          // // 看看他有没有创建的资格
          // const isresult = await service.members.validate_permissions(userId, project_id, app.config.member)
          // if (!isresult) {
          //     const err = new Error('无权操作')
          //     err.status = 403
          //     throw err
          // }
          // 尝试创建
          await service.mock.create(project_id, method, url, response, headers, params, data, apis_id, name)
          helper.success(null, '创建成功')
      } catch (err) {
          helper.error(err.status, err.message)
      }
      }

    // /**
    //      * @summary Mock服务
    //      * @description 根据动态路由匹配mock服务
    //      * @router post /v1/mock/:id/:url*
    //      * @response 400 ErrorResponse 参数问题
    //      */
    async mock() {
      const apiDoc = await this.findApi()
      await this.handleMock(this.ctx.method.toLowerCase(), apiDoc)
    }

    async findApi() {
      const method = this.ctx.method.toLowerCase()
      // 从url中获取id和url
      const { id, url } = this.ctx.params

      console.log(id, url, method)

      // 先在项目中查找
      if (await this.ctx.model.Project.findOne({ where: { id } })) {
        // 接口路径模式
        // 首先进行全匹配，只允许前面多个/ 没有参数
        let res = await this.ctx.model.Mock.findOne({
          where: {
            url: { [Op.regexp]: `^/${url}$` },
            project_id: id,
            method
          }
        })

        res = res.dataValues

        // if (!res) {
        //   // 全匹配未找到，则进行restful路径参数匹配，如/api/:id
        //   // url中每个位置都全匹配或匹配路径参数，((api)|(:.*))
        //   let regex = `/${url}`.replace(/(?<=\/).*?((?=(\/))|$)/g, (...args) => `((${args[0]})|(:[^\/]*))`)
        //   regex = `^${regex}$`
        //   res = await this.ctx.model.Mock.findOne({ url: { $regex: regex }, project_id: id, method })
        // }
        return res
      }
      // // 找不到直接查找api_id  纯hash模式api，全匹配
      // const res = this.ctx.model.Mock.findOne({ api_id: id })
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
      this.ctx.body = this.getResponse(apiDoc) || {}
    }

    // 获取mock响应
    getResponse(apiDoc) {
      console.log('[apiDoc]')
      console.log(apiDoc)

      if (apiDoc.response) {
      // 将apiDoc.response的text文本转化成对象
      const schema = JSON.parse(apiDoc.response)
      console.log('[schema]')
      console.log(schema)
      return buildExampleFromSchema(schema)
    }
      return {}
    }

  /**
    * @summary 查询mock列表
    * @description 通过apis_id查询mock列表
    * @router post /v1/mock/list
    * @request body RequestMockList
    * @response 200 ResponseMockList 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 403 ForbiddenError 无权
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 未知错误
    */
    async list() {
      const { service, helper, request, validate, rule } = this.ctx
      const { apis_id } = request.body
      try {
        // 参数校验
        const passed = await validate.call(this, rule.RequestApisQuery, request.body)
        if (!passed) {
            const err = new Error('参数验证错误')
            err.status = 400
            throw err
        }
        // // 获取请求用户ID
        // const userId = this.ctx.state.user.id
        // // 查询这个apis的信息
        // const apiresult = await service.apis.getApiById(apis_id)
        // // 判断用户是不是正式成员
        // const isresult = await service.members.validate_permissions(userId, apiresult.project_id, app.config.member)
        // if (!isresult) {
        //     const err = new Error('无权操作')
        //     err.status = 403
        //     throw err
        // }
        // 查询mock列表
        const mocklist = await service.mock.selectMockListByApisId(apis_id)
        helper.success(mocklist, '查询成功')
    } catch (err) {
        helper.error(err.status, err.message)
    }
  }
}

module.exports = MockController

