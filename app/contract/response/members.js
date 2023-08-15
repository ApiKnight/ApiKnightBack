'use strict'
module.exports = {
    ResponseMembersList: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                avatar_url: { type: 'string', description: '头像地址' },
                name: { type: 'string', description: '成员姓名' },
                user_id: { type: 'string', description: '成员id' },
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
