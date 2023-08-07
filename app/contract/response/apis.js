'use strict'
module.exports = {
    ResponseCreateApis: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '创建成功', description: '描述信息' }
    },
    ResponseDeleteApis: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '删除成功', description: '描述信息' }
    },
    ResponseUpdateApis: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '更新成功', description: '描述信息' }
    },
    ResponseQueryApis: {
        code: {
            type: 'number',
            example: 200,
            description: '状态码'
        },
        data: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'ID' },
                folder_id: { type: 'string', description: '文件夹ID' },
                create_user: { type: 'string', description: '创建用户' },
                create_time: { type: 'string', description: '创建时间' },
                operate_time: { type: 'string', description: '操作时间' },
                operate_user: { type: 'string', description: '操作用户' },
                request_data: { type: 'string', description: '请求数据' },
                response_data: { type: 'string', description: '响应数据' },
                project_id: { type: 'number', description: '项目ID' },
                description: { type: 'string', description: '描述' },
                name: { type: 'string', description: '名称' }
            }
        },
        message: {
            type: 'string',
            example: '更改成功',
            description: '描述信息'
        }
    }
}
