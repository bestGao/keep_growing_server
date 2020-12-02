'use strict';

const Service = require('egg').Service;

class MerchantService extends Service {
  async queryInfo() {
    const { ctx, logger } = this;
    const Authorization = ctx.get('Authorization') || '';
    try {
      const res = await ctx.curl('https://madminapi-test.htv2x.com/eplate/merchant_admin/merchant/get', {
        dataType: 'json',
        headers: {
          Authorization,
        },
      });

      if (res.data.code === 200) {
        return res.data.data;
      }
      return Promise.reject(res.data.msg);

    } catch (error) {
      logger.error(error);
      return Promise.reject(error);
    }
  }
}

module.exports = MerchantService;
