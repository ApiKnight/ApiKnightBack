'use strict'
module.exports = {
    RequestApisCreate: {
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        folder_id: { type: 'string', required: true, description: '所属文件夹id', message: '所属文件夹id' },
        request_data: { type: 'string', required: true, description: '请求参数', message: '请求参数' },
        response_data: { type: 'string', required: true, description: '响应参数', message: '响应参数' },
        description: { type: 'string', required: true, description: '描述内容', message: '描述内容' },
        name: { type: 'string', required: true, description: 'apis名', message: 'apis名' }
    },
    RequestApisDelete: {
        apis_id: { type: 'string', required: true, description: '所属文件夹id', message: '所属文件夹id' }
    },
    RequestApisUpdate: {
        folder_id: { type: 'string', required: false, description: '所属文件夹id', message: '所属文件夹id' },
        request_data: { type: 'string', required: false, description: '请求参数', message: '请求参数' },
        response_data: { type: 'string', required: false, description: '响应参数', message: '响应参数' },
        description: { type: 'string', required: false, description: '描述内容', message: '描述内容' },
        name: { type: 'string', required: false, description: 'apis名', message: 'apis名' },
        notes: { type: 'string', require: true, description: '备注内容' },
        apis_id: { type: 'string', required: true, description: '要修改的apis的id', message: '所属文件夹id' }
    },
    RequestApisQuery: {
        apis_id: { type: 'string', required: true, description: '所属文件夹id', message: '所属文件夹id' }
    }
}
