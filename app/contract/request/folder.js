'use strict'
module.exports = {
    RequestFolderCreate: {
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        parent_id: { type: 'string', required: true, description: '父文件夹id', message: '父文件夹id' },
        name: { type: 'string', required: true, description: '文件夹名', message: '文件夹名' }
    },
    RequestFolderUpdate: {
        folder_id: { type: 'string', required: true, description: '文件夹id', message: '文件夹id' },
        parent_id: { type: 'string', required: false, description: '父文件夹id', message: '父文件夹id' },
        name: { type: 'string', required: false, description: '文件夹名', message: '文件夹名' }
    },
    RequestFolderDelete: {
        folder_id: { type: 'string', required: true, description: '文件夹id', message: '文件夹id' }
    }
}
