'use strict';

/**
 * 商户的菜单展示表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT, STRING, INTEGER } = app.Sequelize;

  const MerchantMenu = app.model.define('merchant_menu', {
    id: {
      type: BIGINT(),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    merchantUserId: {
      // field: 'merchant_user_id',
      type: BIGINT(),
      allowNull: false,
      comment: '商户ID',
    },
    type: {
      field: 'type',
      type: STRING(10),
      allowNull: false,
      comment: 'menu类型，group分组，page页面',
    },
    parentId: {
      type: BIGINT(),
      allowNull: false,
      comment: '父ID，-1代表没有',
    },
    name: {
      type: STRING(100),
      allowNull: false,
      comment: '名称',
    },
    icon: {
      type: STRING(500),
      allowNull: true,
      comment: '图标',
    },
    pageId: {
      type: BIGINT(),
      allowNull: false,
      comment: '页面ID，-1代表没有，type=group时则是-1',
    },
    sort: {
      type: INTEGER(),
      allowNull: false,
      comment: '排序',
    },
    modifyUserId: {
      // field: 'modify_user_id',
      type: BIGINT(),
      allowNull: false,
      comment: '修改记录人ID',
    },
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

  MerchantMenu.associate = function() {
    MerchantMenu.hasOne(app.model.Page, {
      foreignKey: 'id',
      sourceKey: 'pageId',
    });
  };

  return MerchantMenu;
};
