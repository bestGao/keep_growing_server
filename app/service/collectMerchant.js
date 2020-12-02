'use strict';

const Service = require('egg').Service;

class CollectMerchantService extends Service {
  async query({ userId, limit, offset }) {
    const { ctx } = this;

    return ctx.model.CollectMerchant.findAndCountAll({
      where: {
        userId,
      },
      limit,
      offset,
    });
  }
  async queryById(id) {
    const { ctx } = this;
    return ctx.model.CollectMerchant.findByPk(id);
  }
  async create(params) {
    const { ctx } = this;

    return ctx.model.CollectMerchant.create(params);
  }
  async destroy(id) {
    const { ctx } = this;
    try {

      await ctx.model.CollectMerchant.destroy({
        where: {
          id,
        },
      });
      ctx.body = {
        status: true,
        code: 200,
        msg: 'success',
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        status: false,
        code: 500,
        errors: e.errors,
        msg: e.errors.message,
      };
    }
  }
}

module.exports = CollectMerchantService;
