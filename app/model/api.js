// 'use strict'

// /**
//  * 接口表
//  */

// const { DataTypes } = require('sequelize')

// module.exports = app => {
//   const Api = app.model.define('api',
//     {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4
//       },
//       name: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true
//       },
//       desc: {
//         type: DataTypes.STRING(255),
//         allowNull: false
//       },
//       devUrl: {
//         type: DataTypes.STRING(255)
//       },
//       prodUrl: {
//         type: DataTypes.STRING(255)
//       },
//       url: {
//         type: DataTypes.STRING(255)
//       },
//       method: {
//         type: DataTypes.STRING(10),
//         allowNull: false
//       },
//       params: {
//         type: DataTypes.STRING(255)
//       },
//       headers: {
//         type: DataTypes.STRING(255)
//       },
//       body: {
//         type: DataTypes.OBJECT
//       },
//       res: {
//         type: DataTypes.OBJECT
//       },
//       createTime: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//       },
//       updateTime: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//       },
//       createUser: {
//         type: DataTypes.UUID,
//         allowNull: false
//       }
//     }
//   )
//   return Api
// }
