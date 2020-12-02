'use strict';

/**
 * 页面表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT, STRING } = app.Sequelize;

  const Page = app.model.define('page', {
    id: {
      type: BIGINT(),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    modularId: {
      type: BIGINT(),
      allowNull: false,
      comment: '功能模块ID',
    },
    name: {
      type: STRING(150),
      allowNull: false,
      comment: '页面名字',
    },
    code: {
      type: STRING(50),
      allowNull: false,
      comment: '唯一编码',
    },
    path: {
      type: STRING(255),
      allowNull: false,
      comment: '页面路径',
    },
    status: {
      type: STRING(10),
      allowNull: false,
      comment: '状态',
    },
    remark: {
      type: STRING(255),
      allowNull: true,
      comment: '备注',
    },
    // modifyUserId: {
    //   type: BIGINT(),
    //   allowNull: false,
    //   comment: '修改记录人ID',
    // },
    createdAt: {
      field: 'create_time',
      type: DATE(),
      comment: '创建日期',
    },
    updatedAt: {
      field: 'modify_time',
      type: DATE(),
      comment: '更新日期',
    },
    deletedAt: {
      field: 'delete_time',
      type: DATE(),
      comment: '删除日期',
    },
  }, {
    freezeTableName: true, // true 时不会在库中映射表时增加复数表名
    underscored: true, // 属性名称的下划线版本
    timestamps: true, // 时间戳
    paranoid: true, // 软删除
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return Page;
};
