'use strict'
module.exports = {
    RequestCreateProject: {
        description: { type: 'string', required: true, description: '项目简介', message: '项目简介' },
        projectname: { type: 'string', required: true, description: '项目名', message: '项目名' }
    },
    RequestDeleteProject: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' }
    },
    RequestUpdateProject: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        description: { type: 'string', required: false, description: '项目简介', message: '项目简介' },
        projectname: { type: 'string', required: false, description: '项目名', message: '项目名' }
    },
    RequestInviteProject: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        userid: { type: 'string', required: false, description: '项目简介', message: '项目简介' },
        projectname: { type: 'string', required: false, description: '项目名', message: '项目名' }
    },
    RequestQueryProject: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' }
    }
}
