
'use strict'

/**
 * 文件夹表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
    const Folder = app.model.define('folder',
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
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            parent_id: {
                type: DataTypes.UUID
            }
        },
        {
            tableName: 'folder',
            timestamps: false
        }
    )
    Folder.associate = () => {
        app.model.Folder.hasMany(app.model.Apis, { foreignKey: 'folder_id' })
    }
    return Folder
}
