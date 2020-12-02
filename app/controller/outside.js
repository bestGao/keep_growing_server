'use strict';

const Controller = require('egg').Controller;

class OutsideController extends Controller {
  async aliWeather() {
    const { ctx } = this;

    try {
      ctx.validate({
        lat: { type: 'string' },
        lon: { type: 'string' },
      });
    } catch (error) {
      ctx.body = {
        status: false,
        code: 500,
        error,
        msg: '参数错误',
      };
      return;
    }
    try {
      const result = await ctx.service.outside.aliWeather({
        ...ctx.request.body,
        token: '443847fa1ffd4e69d929807d42c2db1b',
      });

      if (result && result.data) {
        ctx.body = {
          status: true,
          code: 200,
          data: result,
          msg: 'success',
        };
      } else {
        ctx.body = {
          status: false,
          code: 500,
          msg: '查询失败',
        };
        ctx.logger.error(result);
      }
    } catch (error) {
      ctx.body = {
        status: false,
        code: 500,
        msg: error.message,
      };
      ctx.logger.error(error);
    }
  }
}

module.exports = OutsideController;