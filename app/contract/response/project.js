'use strict'
module.exports = {
    ResponseCreateProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                id: { type: 'int', description: '项目id', example: '1000' },
                projectname: { type: 'string', description: '项目名', example: '一个项目' },
                description: { type: 'string', description: '项目描述' }
            }
        },
        message: { type: 'string', example: '创建成功', description: '描述信息' }
    },
    ResponseDeleteProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '删除成功', description: '描述信息' }
    },
    RespnseDeleteError: {
        code: { type: 'number', example: 401, description: '状态码' },
        message: { type: 'string', example: '无权删除', description: '用户不是项目所有者,删除失败' }
    },
    ResponseUpdateProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                id: { type: 'int', description: '项目id', example: '1000' },
                projectname: { type: 'string', description: '项目名', example: '一个项目' },
                description: { type: 'string', description: '项目描述' },
                create_user: {
                    type: 'object', properties: {
                        id: { type: 'string', description: '用户 ID' },
                        username: { type: 'string', description: '用户名' },
                        email: { type: 'string', description: '邮箱' },
                        phone: { type: 'string', description: '手机号码' },
                        avatar_url: { type: 'string', description: '头像地址' }
                    }
                }
            }
        },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    },
    ResponsesearchUsersByEmail: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'int', description: '项目id', example: '1000' },
                username: { type: 'string', description: '用户名' },
                email: { type: 'string', description: '邮箱' },
                avatar_url: { type: 'string', description: '头像地址' }
            }
        },
        message: { type: 'string', example: '查询成功', description: '描述信息' }
    }
}
