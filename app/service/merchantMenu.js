'use strict';

const Service = require('egg').Service;

class MerchantMenuService extends Service {
  async query({ merchantUserId }) {
    const { ctx } = this;

    return ctx.model.MerchantMenu.findAll({
      where: {
        merchantUserId,
      },
      raw: true,
      order: [
        [ 'sort', 'ASC' ],
        [ 'create_time', 'DESC' ],
      ],
    });
  }
  async queryById(id) {
    const { ctx } = this;
    return ctx.model.MerchantMenu.findByPk(id);
  }
  async create(params) {
    const { ctx } = this;

    return ctx.model.MerchantMenu.create(params);
  }
  async update({ id, ...params }) {
    const { ctx } = this;

    return ctx.model.MerchantMenu.update(
      { ...params },
      {
        where: { id },
      }
    );
  }
  async destroy(id) {
    const { ctx } = this;

    return ctx.model.MerchantMenu.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MerchantMenuService;
