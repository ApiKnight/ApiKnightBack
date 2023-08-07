
'use strict'

/**
 * 历史版本表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Version = app.model.define('version',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            operate_time: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'operate_time',
                defaultValue: DataTypes.NOW
            },
            operate_user: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'operate_user'
            },
            request_data: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'request_data'
            },
            response_data: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'response_data'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apis_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'version',
            timestamps: false
        }
    )
    Version.associate = () => {
        app.model.Version.belongsTo(app.model.Apis, { foreignKey: 'apis_id' })
    }
    return Version
}
