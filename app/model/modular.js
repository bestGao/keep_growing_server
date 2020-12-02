'use strict';

/**
 * 功能模块表
 * @param {*} app
 */
module.exports = app => {
  const { DATE, BIGINT, STRING } = app.Sequelize;

  const Modular = app.model.define('modular', {
    id: {
      type: BIGINT(),
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    code: {
      type: STRING(50),
      allowNull: false,
      comment: '唯一的模块编码',
    },
    name: {
      type: STRING(150),
      allowNull: false,
      comment: '功能模块名字',
    },
    openingType: {
      type: STRING(20),
      allowNull: false,
      comment: '功能模块开通的方式。auto：自动开通；merchant_type_auto：指定商户类型自动开通；manual_opening：手动开通；',
    },
    merchantType: {
      type: STRING(255),
      allowNull: true,
      comment: '',
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

  Modular.associate = function() {
    Modular.hasMany(app.model.Page, {
      foreignKey: 'modularId',
      sourceKey: 'id',
    });
    Modular.hasMany(app.model.PageOperation, {
      as: 'pageOperation',
      foreignKey: 'modularId',
      sourceKey: 'id',
    });
  };

  return Modular;
};
