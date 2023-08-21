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
    },
    RespnseMembersDelete: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '删除成功', description: '描述信息' }
    },
    ResponseMembersConvert: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '转让成功', description: '描述信息' }
    },
    ResponseMembersQueryRole: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                role: { type: 'string', description: '权限', example: '1' }
            }
        },
        message: { type: 'string', example: '查询成功', description: '描述信息' }
    }
}
