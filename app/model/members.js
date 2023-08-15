
'use strict'

/**
 * 人员关系表
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
    Members.associate = () => {
        Members.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' })
    }
    return Members
}
