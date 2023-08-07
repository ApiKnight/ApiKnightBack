
'use strict'

/**
 * 接口表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Apis = app.model.define('apis',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            folder_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'folder_id'
            },
            create_user: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'create_user'
            },
            create_time: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'create_time',
                defaultValue: DataTypes.NOW
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
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'project_id'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'apis',
            timestamps: false
        }
    )
    Apis.associate = () => {
        app.model.Apis.hasMany(app.model.Version, { foreignKey: 'apis_id' })
        app.model.Apis.belongsTo(app.model.Folder, { foreignKey: 'folder_id' })
    }
    return Apis
}
