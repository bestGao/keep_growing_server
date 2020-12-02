'use strict';

const Service = require('egg').Service;
const { or } = require('sequelize').Op;

class MerchantPolePermissionService extends Service {
  // 查询
  async query(params) {
    const { ctx, logger } = this;

    // 查询商户所有权限
    if (!params.merchantRoleId) {
      logger.info('[MerchantPolePermissionService query] 查询商户所有权限', params.merchantRoleId);
      return ctx.service.merchantModualr.queryModularPermission({ merchantUserId: params.merchantUserId });
    }
    logger.info('[MerchantPolePermissionService query] 查询角色权限', params);
    const mrp = await ctx.model.MerchantRolePermission.findAll({
      where: {
        status: 'enabled',
        ...params,
      },
      // attributes: [ 'id', 'name', 'pageId', 'parentId', 'type', 'merchantUserId', 'modifyUserId' ],
      include: [
        {
          model: ctx.model.Page,
          required: false,
          where: {
            status: 'enabled',
          },
          attributes: [ 'id', 'modularId', 'name', 'code', 'path', 'remark' ],
        },
        {
          model: ctx.model.PageOperation,
          as: 'pageOperation',
          required: false,
          where: {
            status: 'enabled',
          },
          attributes: [ 'id', 'modularId', 'pageId', 'name', 'code', 'remark' ],
        },
      ],
    });
    this.logger.info(mrp);
    const po = mrp.reduce((acc, cur) => {

      if (cur.type === 'page') {
        // 可能多个角色都配置了相同的页面
        if (!acc.pages.some(page => page.id === cur.page.id)) {
          acc.pages.push({
            merchantUserId: cur.merchantUserId,
            merchantRoleId: cur.merchantRoleId,
            ...cur.page?.toJSON(),
          });
        }
      } else if (cur.type === 'operation') {
        // 可能多个角色都配置了相同的操作
        if (!acc.operations.some(operation => operation.id === cur.pageOperation.id)) {
          acc.operations.push({
            merchantUserId: cur.merchantUserId,
            merchantRoleId: cur.merchantRoleId,
            ...cur.pageOperation?.toJSON(),
          });
        }
      }
      return acc;
    }, { pages: [], operations: [] });

    return po;
  }

  async queryByUserId(userId) {
    const { ctx, logger } = this;

    const mpr = await ctx.service.merchantPersonRole.query({ userId });
    logger.info('[merchantPersonRole.query]', mpr);
    const roles = mpr.map(item => item.merchantRoleId);

    // 角色的相关页面、操作
    logger.info('[RoleService query 所有角色]', roles);
    return this.query({
      [or]: [
        {
          merchantRoleId: roles,
        },
      ],
    });
  }

  async update(params) {
    const { ctx, logger } = this;
    const {
      merchantUserId,
      userId,
      pages = [],
      operations = [],
      merchantRoleId,
    } = params;
    try {
      const mrp = await ctx.model.MerchantRolePermission.findAll({
        where: {
          status: 'enabled',
          merchantRoleId,
        },
      });

      // 需要删除的角色
      const delPermission = mrp.filter(permission => !pages.includes(permission.pageId) && !operations.includes(permission.pageOperationId));
      // 需要添加的角色
      const addPages = pages.filter(pageId => !mrp.some(item => item.pageId === pageId));
      const addOperations = operations.filter(pageOperationId => !mrp.some(item => item.pageOperationId === pageOperationId));
      let parmission = [];
      parmission = parmission.concat(addPages.map(pageId => ({
        merchantUserId,
        merchantRoleId,
        type: 'page',
        pageId,
        status: 'enabled',
        modifyUserId: userId,
      })));
      parmission = parmission.concat(addOperations.map(pageOperationId => ({
        merchantUserId,
        merchantRoleId,
        type: 'operation',
        pageOperationId,
        status: 'enabled',
        modifyUserId: userId,
      })));

      logger.info('需要删除的: ', delPermission.map(item => item.id), '需要添加的页面: ', addPages, '需要添加的操作: ', addOperations, '已经绑定的: ', mrp, '批处理数据：', parmission);

      if (delPermission && delPermission.length) {
        const ids = delPermission.map(item => item.id);
        await this.destroy(ids);
      }

      if (parmission && parmission.length) {
        await ctx.model.MerchantRolePermission.bulkCreate(parmission);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async destroy(id) {
    const { ctx } = this;

    return ctx.model.MerchantRolePermission.destroy({
      where: {
        id,
      },
      force: true,
    });
  }
}

module.exports = MerchantPolePermissionService;
