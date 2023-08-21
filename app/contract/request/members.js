'use strict'
module.exports = {
    RequestMembersList: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' }
    },
    RequestMembersUpdate: {
        role: { type: 'integer', required: true, description: '希望更改的权限', message: '希望更改的权限' },
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        user_id: { type: 'string', required: true, description: '目标成员id', message: '成员id' }
    },
    RequestMembersDelete: {
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        user_id: { type: 'string', required: true, description: '成员id', message: '成员id' }
    },
    RequestMembersConvert: {
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
        user_id: { type: 'string', required: true, description: '转让成员id', message: '转让成员id' }
    },
    RequestMembersQueryRole: {
        project_id: { type: 'integer', required: true, description: '项目id', message: '项目id' },
    }
}
