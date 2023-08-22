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
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'url'
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'method'
            },
            params: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            data: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            headers: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            response: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            apis_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'apis_id'
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'project_id'
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
