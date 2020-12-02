'use strict';

/**
 * 商户的角色权限对应表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT, STRING } = app.Sequelize;

  const MerchantRolePermission = app.model.define('merchant_role_permission', {
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
    merchantRoleId: {
      // field: 'merchant_role_id',
      type: BIGINT(),
      allowNull: false,
      comment: '角色ID',
    },
    type: {
      field: 'type',
      type: STRING(10),
      allowNull: false,
      comment: '权限类型，page页面打开权限，operation页面上的操作权限',
    },
    pageId: {
      // field: 'page_id',
      type: BIGINT(),
      allowNull: false,
      comment: '页面ID',
    },
    pageOperationId: {
      // field: 'page_operation_id',
      type: BIGINT(),
      allowNull: true,
      comment: '页面上的操作ID',
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

  MerchantRolePermission.associate = function() {
    MerchantRolePermission.hasOne(app.model.Page, {
      foreignKey: 'id',
      sourceKey: 'pageId',
    });
    MerchantRolePermission.hasOne(app.model.PageOperation, {
      as: 'pageOperation',
      foreignKey: 'id',
      sourceKey: 'pageOperationId',
    });
  };

  return MerchantRolePermission;
};
