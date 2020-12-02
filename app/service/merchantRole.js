'use strict';

const Service = require('egg').Service;

class MerchantRoleService extends Service {
  async query({ limit, offset, ...query }) {
    const { ctx } = this;

    return ctx.model.MerchantRole.findAndCountAll({
      where: {
        ...query,
      },
      limit,
      offset,
    });
  }
  async queryById(id) {
    const { ctx } = this;
    return ctx.model.MerchantRole.findByPk(id);
  }
  async create(params) {
    const { ctx } = this;

    return ctx.model.MerchantRole.create(params);
  }
  async update({ id, ...params }) {
    const { ctx } = this;

    return ctx.model.MerchantRole.update(
      { ...params },
      {
        where: { id },
      }
    );
  }
  async destroy(id) {
    const { ctx } = this;

    return ctx.model.MerchantRole.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MerchantRoleService;
