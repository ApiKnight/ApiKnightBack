'use strict'

/**
 * 用户表
 */

module.exports = app => {
    const { TEXT, STRING, INTEGER, DATE } = app.Sequelize
    const User1 = app.model.define('users', {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: STRING,
            comment: '同微信的 unionid，作为预留字段，不一定有值'
        },
        age: {
            type: INTEGER,
            allowNull: false,
            comment: '昵称，同微信的 nickName'
        },
        created_at: {
            type: DATE,
            comment: '登录密码，作为预留字段，不一定有值'
        },
        updated_at: {
            type: DATE,
            allowNull: false,
            comment: '头像，同微信的 avatarUrl'
        }
    })

    return User1
}
