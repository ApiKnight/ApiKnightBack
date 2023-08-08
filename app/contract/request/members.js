'use strict'
module.exports = {
    RequestMembersList: {
        projectid: { type: 'integer', required: true, description: '项目id', message: '项目id' }
    },
    RequestMembersUpdate: {
        id: { type: 'string', required: true, description: '记录id', message: '记录id' },
        role: { type: 'string', required: true, description: '希望更改的权限', message: '希望更改的权限' }
    }
}
