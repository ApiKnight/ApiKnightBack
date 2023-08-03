'use strict'
const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
module.exports = {
    RequestInviteSending: {
        projectid: { type: 'string', required: true, description: '项目id', message: '项目id' },
        email: { type: 'string', required: true, pattern: Email }
    },
    RequestInviteReceive: {
        projectid: { type: 'string', required: true, description: '项目id', message: '项目id' }
    },
    RequestInviteList: {
        projectid: { type: 'string', required: true, description: '项目id', message: '项目id' }
    },
    RequestUpdate: {
        id: { type: 'string', required: true, description: '审批记录id', message: '审批记录id' },
        projectid: { type: 'string', required: true, description: '项目id', message: '项目id' },
        status: { type: 'string', required: true, description: '审批状态', message: '审批状态' }
    }
}
