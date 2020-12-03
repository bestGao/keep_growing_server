'use strict'

/**
 * keep_growing 网页用户表
 * @param {*} app
 */
module.exports = (app) => {
  const { DATE, BIGINT, STRING } = app.Sequelize

  const webUsers = app.model.define(
    'users',
    {
      id: {
        type: BIGINT(),
        primaryKey: true,
        autoIncrement: true,
        comment: '自增id',
      },
      telephone: {
        type: STRING(255),
        allowNull: false,
        comment: '手机号',
      },
      username: {
        type: STRING(255),
        allowNull: false,
        comment: '用户名',
      },
      password: {
        type: STRING(255),
        allowNull: false,
        comment: '密码',
      },
      createStamp: {
        field: 'create_stamp',
        type: DATE(),
        comment: '加入时间',
      },
      modifyStamp: {
        field: 'modify_stamp',
        type: DATE(),
        comment: '修改时间',
      },
    },
    {
      freezeTableName: true,
      underscored: false,
      timestamps: true,
      updatedAt: 'modifyStamp',
      createdAt: 'createStamp',
    }
  )

  return webUsers
}
