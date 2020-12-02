'use strict';

/**
 * 商户的人员角色对应表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT, STRING } = app.Sequelize;

  const MerchantPersonRole = app.model.define('merchant_person_role', {
    id: {
      type: BIGINT(),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    merchantUserId: {
      field: 'merchant_user_id',
      type: BIGINT(),
      allowNull: false,
      comment: '商户ID',
    },
    userId: {
      field: 'user_id',
      type: BIGINT(),
      allowNull: false,
      comment: '用户user id',
    },
    merchantRoleId: {
      field: 'merchant_role_id',
      type: BIGINT(),
      allowNull: false,
      comment: '角色ID',
    },
    status: {
      type: STRING(10),
      allowNull: false,
      comment: '状态',
    },
    modifyUserId: {
      field: 'modify_user_id',
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
    underscored: false, // 属性名称的下划线版本
    timestamps: true, // 时间戳
    paranoid: true, // 软删除
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  MerchantPersonRole.associate = function() {
    MerchantPersonRole.hasOne(app.model.MerchantRole, {
      as: 'merchantRole',
      foreignKey: 'id',
      sourceKey: 'merchantRoleId',
    });
  };


  return MerchantPersonRole;
};
