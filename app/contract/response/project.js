'use strict'
module.exports = {
    ResponseCreateProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                id: { type: 'integer', description: '项目id', example: '1000' },
                projectname: { type: 'string', description: '项目名', example: '一个项目' },
                description: { type: 'string', description: '项目描述' },
                project_img: { type: 'string', description: '项目头像', message: '项目头像' }
            }
        },
        message: { type: 'string', example: '创建成功', description: '描述信息' }
    },
    ResponseDeleteProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '删除成功', description: '描述信息' }
    },
    ResponseUpdateProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                id: { type: 'integer', description: '项目id', example: '1000' },
                projectname: { type: 'string', description: '项目名', example: '一个项目' },
                description: { type: 'string', description: '项目描述' },
                project_img: { type: 'string', description: '项目头像', message: '项目头像' },
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
                id: { type: 'integer', description: '项目id', example: '1000' },
                username: { type: 'string', description: '用户名' },
                email: { type: 'string', description: '邮箱' },
                avatar_url: { type: 'string', description: '头像地址' }
            }
        },
        message: { type: 'string', example: '查询成功', description: '描述信息' }
    },
    ResponseGetProjectList: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                id: { type: 'integer', description: '项目id', example: '1000' },
                projectname: { type: 'string', description: '项目名', example: '一个项目' },
                description: { type: 'string', description: '项目描述' },
                project_img: { type: 'string', description: '项目头像', message: '项目头像' },
                create_user: {
                    type: 'object', properties: {
                        id: { type: 'string', description: '用户 ID' },
                        username: { type: 'string', description: '用户名' },
                        email: { type: 'string', description: '邮箱' },
                        phone: { type: 'string', description: '手机号码' },
                        avatar_url: { type: 'string', description: '头像地址' }
                    }
                },
                role: { type: 'string', description: '身份信息', example: '项目所有者' }
            }
        },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    },
    ResponseQueryProject: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: { type: 'string', example: '过于复杂请求试试看', description: '过于复杂请求试试看' },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    },
    ResponseQueryProjectSummary: {
        code: { type: 'number', example: 200, description: '状态码' },
        data: {
            type: 'object',
            properties: {
                project_img: { type: 'string', description: '项目头像', message: '项目头像' },
                projectname: { type: 'string', description: '项目名称' },
                description: { type: 'string', description: '项目描述' },
                create_time: { type: 'string', description: '创建时间', example: '2023-07-31 16:39:20' },
                apis_count: { type: 'number', description: '项目拥有apis数量' },
                members_count: { type: 'number', description: '项目拥有成员数量' }
            }
        },
        message: { type: 'string', example: '查询成功', description: '描述信息' }
    },
    RequestQueryRootFolderid: {
        id: { type: 'string', description: '根目录id' }
    }
}
