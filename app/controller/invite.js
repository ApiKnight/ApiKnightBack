'use strict'
const nodemailer = require('nodemailer')
const Controller = require('egg').Controller
/**
 * @controller Invite模块
 */
class InviteController extends Controller {
    /**
       * @summary 发送邀请
       * @description 传入projectid和email,邀请被邀请者
       * @router post /v1/invite/sending
       * @request body RequestInviteSending
       * @response 200 ResponseInviteSending 请求成功
       * @response 400 ErrorResponse 参数问题
       * @response 403 ForbiddenError 无权
       * @response 401 ErrorResponseUnauthorized 未登录
       * @response 500 InternalServerError 未知错误
       */
    async inviteSending() {
        const { service, app, helper, rule, request, validate } = this.ctx
        const { projectid, email } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestInviteSending, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 判断对方是不是注册用户避免被滥用
            const isRegister = await service.user.isEmailRegistered(email)
            if (!isRegister) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 查询项目信息
            const projectresult = await service.project.getByProjectId(projectid)
            // 查询发起者信息
            const createuser = await service.user.info()
            // 判断用户是不是项目所有者
            await service.project.isOwner(projectid, createuser.id)
            // 邀请链接
            const invite_url = app.config.domainname + '/v1/confirmation/' + projectid
            // 配置链接
            const transporter = nodemailer.createTransport(app.config.mailer.transport)
            // to应该是被邀请者的email
            const mailOptions = {
                from: '210813750@qq.com', // 发件人的 QQ 邮箱
                to: email,
                subject: `${createuser.username}邀请你加入${projectresult.projectname}项目组`,
                html: `
          <html>
            <head>
              <style>
                .container {
                  text-align: center;
                }
                .message {
                  font-size: 18px;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <p class="message">${createuser.username}邀请你加入${projectresult.projectname}项目组,点击加入我们${invite_url}</p>
              </div>
            </body>
          </html>
        `
            }
            const result = await transporter.sendMail(mailOptions)
            this.ctx.body = result
            helper.success(null, '邀请成功')
        } catch (error) {
            helper.error(error.status, error.message)
        }
    }
    /**
     * @summary 请求加入
     * @description 传入projectid,userid无需传入,在token的解析内容里就有
     * @router post /v1/invite/receive
     * @request body RequestInviteReceive
     * @response 200 ResponseInviteReceive 请求成功
     * @response 400 ErrorResponse 参数问题
      * @response 403 ForbiddenError 无权
     * @response 401 ErrorResponseUnauthorized 未登录
     * @response 500 InternalServerError 未知错误
     */
    async inviteReceive() {
        const { service, helper, rule, request, validate } = this.ctx
        const { projectid } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestInviteReceive, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 获取申请加入的项目信息
            const project = await service.project.getByProjectId(projectid)
            console.log(project)
            // 在邀请表invite里新增一条请求记录
            await service.invite.create({ project, userId })
            helper.success(null, '申请成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
    * @summary 项目拥有者拉取审批列表
    * @description 传入projectid,userid无需传入,在token的解析内容里就有
    * @router post /v1/invite/wlist
    * @request body RequestInviteList
    * @response 200 ResponseInviteList1 请求成功
    * @response 400 ErrorResponse 参数问题
    * @response 403 ForbiddenError 无权
    * @response 401 ErrorResponseUnauthorized 未登录
    * @response 500 InternalServerError 未知错误
    */
    async inviteList1() {
        const { service, helper, rule, request, validate } = this.ctx
        const { projectid } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestInviteList, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 判断用户是不是项目所有者
            await service.project.isOwner(projectid, userId)
            // 拉取审批列表
            const project = await service.invite.list1(projectid, userId)
            helper.success(project, '拉取成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
   * @summary 拉取申请列表
   * @description 传入projectid,userid无需传入,在token的解析内容里就有
   * @router get /v1/invite/alist
   * @response 200 ResponseInviteList2 请求成功
   * @response 400 ErrorResponse 参数问题
   * @response 403 ForbiddenError 无权
   * @response 401 ErrorResponseUnauthorized 未登录
   * @response 500 InternalServerError 未知错误
   */
    async inviteList2() {
        const { service, helper } = this.ctx
        try {
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 拉取申请列表
            const project = await service.invite.list2(userId)
            helper.success(project, '拉取成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
    /**
 * @summary 项目管理员修改审批状态
 * @description 传入projectid,审批记录id,修改状态status 0待审批,1通过,-1拒绝
 * @router post /v1/invite/updatestatus
 * @request body RequestInviteUpdate
 * @response 200 ResponseStatusUpdate 请求成功
 * @response 400 ErrorResponse 参数问题
 * @response 401 ErrorResponseUnauthorized 未登录
 * @response 500 InternalServerError 修改失败
 */
    async inviteUpdate() {
        const { service, helper, rule, request, validate } = this.ctx
        const { status, id, projectid } = request.body
        try {
            // 参数校验
            const passed = await validate.call(this, rule.RequestUpdate, request.body)
            if (!passed) {
                const err = new Error('参数验证错误')
                err.status = 400
                throw err
            }
            // 获取请求用户ID
            const userId = this.ctx.state.user.id
            // 判断用户是不是项目所有者
            await service.project.isOwner(projectid, userId)
            // 修改状态
            await service.invite.update(id, status, userId)
            // 看看是不是通过
            if (status === 1) {
                await service.members.createMembers(projectid, userId, 100)
            }
            helper.success(null, '更新成功')
        } catch (err) {
            helper.error(err.status, err.message)
        }
    }
}

module.exports = InviteController
