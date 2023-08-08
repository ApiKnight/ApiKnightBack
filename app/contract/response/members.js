'use strict'
module.exports = {
    ResponseMembersList: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'string', description: '成员信息id', example: '30606ac4-7489-4088-932a-a7b1ae008330' },
                project_id: { type: 'number', description: '项目id', example: '1000' },
                user_id: { type: 'string', description: '成员id', example: '1000' },
                role: { type: 'string', description: '权限', example: '1111' }
            }
        },
        message: { type: 'string', example: '拉取成功', description: '描述信息' }
    },
    ResponseRoleUpdate: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    }
}
