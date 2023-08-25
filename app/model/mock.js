'use strict'

/**
 * MOCK表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Mock = app.model.define('mock',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'project_id'
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'method'
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'url'
            },
            response: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'response'
            },
            headers: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            params: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            data: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            apis_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'apis_id'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            }
        },
        {
            tableName: 'mock',
            timestamps: false
        }
    )
    Mock.associate = () => {
        app.model.Mock.belongsTo(app.model.Apis, { foreignKey: 'apis_id' })
        app.model.Mock.belongsTo(app.model.Project, { foreignKey: 'project_id' })
    }
    return Mock
}
