
'use strict'

/**
 * 用户表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Members = app.model.define('members',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'members',
            timestamps: false
        }
    )

    return Members
}
