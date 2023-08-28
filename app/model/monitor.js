
'use strict'

/**
 * 监控数据表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Monitor = app.model.define('monitor',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'message'
            },
            create_time: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'create_time',
                defaultValue: DataTypes.NOW
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'monitor',
            timestamps: false
        }
    )
    return Monitor
}
