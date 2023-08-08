'use strict'
module.exports = {
    ResponseInviteSending: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '邀请成功', description: '描述信息' }
    },
    ResponseInviteReceive: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '申请成功', description: '描述信息' }
    },
    // 审批列表1
    ResponseInviteList1: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: '项目id', example: '30606ac4-7489-4088-932a-a7b1ae008330' },
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                approve_time: { type: 'string', description: '审批时间', example: '2023-08-01 17:02:04' },
                project_id: { type: 'number', description: '项目id', example: '1000' },
                status: { type: 'number', description: '审批转态0待审批,1通过,-1拒绝', example: '0' },
                name: { type: 'string', description: '申请人', example: 'john_doe' }
            }
        },
        message: { type: 'string', example: '拉取成功', description: '描述信息' }
    },
    // 审批列表1
    ResponseInviteList2: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: '项目id', example: '30606ac4-7489-4088-932a-a7b1ae008330' },
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                approve_time: { type: 'string', description: '审批时间', example: '2023-08-01 17:02:04' },
                project_id: { type: 'number', description: '项目id', example: '1000' },
                status: { type: 'number', description: '审批转态0待审批,1通过,-1拒绝', example: '0' },
                projectname: { type: 'string', description: '项目名', example: '项目1' }
            }
        },
        message: { type: 'string', example: '拉取成功', description: '描述信息' }
    },
    ResponseStatusUpdate: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    }
}
