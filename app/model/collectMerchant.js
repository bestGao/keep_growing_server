'use strict';

/**
 * 航天智行APP 关注商家的列表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT } = app.Sequelize;

  const CollectMerchant = app.model.define('collect_merchant', {
    id: {
      type: BIGINT(),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    userId: {
      field: 'user_id',
      type: BIGINT(),
      allowNull: false,
      comment: '用户id',
    },
    merchantId: {
      field: 'merchant_id',
      type: BIGINT(),
      allowNull: false,
      comment: '商户id',
    },
    createdAt: {
      field: 'created_at',
      type: DATE(),
      comment: '创建日期',
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE(),
      comment: '更新日期',
    },
    deletedAt: {
      field: 'deleted_at',
      type: DATE(),
      comment: '删除日期',
    },
  }, {
    freezeTableName: true,
    underscored: false,
    timestamps: true,
    paranoid: true, // 软删除
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return CollectMerchant;
};
