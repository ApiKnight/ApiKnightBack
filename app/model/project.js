'use strict'

/**
 * 用户表
 */

const { DataTypes } = require('sequelize')
module.exports = app => {
    const Project = app.model.define('Project', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // 启用自增长
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        projectname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'create_time',
            defaultValue: DataTypes.NOW
        },
        create_user: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'create_user'
        },
        project_img: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'project_img'
        }
    }, {
        timestamps: false,
        tableName: 'project'
    })
    Project.associate = () => {
        app.model.Project.hasMany(app.model.Invite, { foreignKey: 'id' })
        app.model.Project.hasMany(app.model.Mock, { foreignKey: 'project_id' })
    }
    return Project
}
