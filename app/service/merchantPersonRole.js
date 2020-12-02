'use strict';

const Service = require('egg').Service;

class MerchantPersonRoleService extends Service {
  // 查询
  async query(params) {
    const { ctx } = this;

    return ctx.model.MerchantPersonRole.findAll({
      where: {
        status: 'enabled',
        ...params,
      },
      include: {
        model: ctx.model.MerchantRole,
        as: 'merchantRole',
        where: {
          status: 'enabled',
        },
      },
    });
  }
  async queryById(id) {
    const { ctx } = this;
    return ctx.model.MerchantPersonRole.findByPk(id);
  }
  async create(params) {
    const { ctx } = this;

    return ctx.model.MerchantPersonRole.bulkCreate(params);
  }
  async update(params) {
    const { ctx, logger } = this;
    const { userId, merchantUserId, roles, modifyUserId } = params;
    try {
      const personRole = await ctx.model.MerchantPersonRole.findAll({
        where: {
          status: 'enabled',
          userId,
        },
      });
      // logger.info('[findAll MerchantPersonRole]', personRole);
      const already = personRole.map(item => item.merchantRoleId);

      // 需要删除的角色
      const delRoles = personRole.filter(role => !roles.includes(role.merchantRoleId));
      // 需要添加的角色
      const addRoles = roles.filter(roleId => !already.includes(roleId));
      logger.info('需要删除的: ', delRoles, '需要添加的: ', addRoles, '已经绑定的: ', already, '传入参数: ', roles);
      if (delRoles && delRoles.length) {
        const ids = delRoles.map(item => item.id);
        await this.destroy(ids);
      }

      if (addRoles && addRoles.length) {
        const bulk = addRoles.map(merchantRoleId => ({
          merchantUserId,
          userId,
          merchantRoleId,
          status: 'enabled',
          modifyUserId,
        }));
        await this.create(bulk);
      }
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async destroy(id) {
    const { ctx } = this;

    return ctx.model.MerchantPersonRole.destroy({
      where: {
        id,
      },
      force: true,
    });
  }
}

module.exports = MerchantPersonRoleService;
