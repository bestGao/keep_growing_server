'use strict';

const Controller = require('egg').Controller;

class CollectMerchantController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      ctx.validate({
        userId: { type: 'string' },
      }, ctx.query);
    } catch (e) {
      ctx.body = {
        status: false,
        code: 500,
        errors: e,
        msg: '参数错误',
      };
      return;
    }

    const { pageSize = 10, pageNo = 1, ...otherQuery } = ctx.query;
    const query = { limit: pageSize, offset: parseInt(pageSize * (pageNo - 1), 10) };

    try {
      const { count, rows } = await ctx.service.collectMerchant.query({
        ...query,
        ...otherQuery,
      });

      ctx.body = {
        status: true,
        code: 200,
        data: rows,
        total: count,
        msg: '查询成功',
      };
    } catch (error) {
      ctx.logger.error(error);
      ctx.body = {
        status: false,
        code: 500,
        errors: error.message,
        msg: error.message,
      };
    }
  }
  async create() {
    const { ctx } = this;

    try {
      ctx.validate({
        userId: { type: 'string' },
        merchantId: { type: 'string' },
      });
    } catch (e) {
      ctx.body = {
        status: false,
        code: 500,
        errors: e,
        msg: '参数错误',
      };
      return;
    }

    try {
      const res = await ctx.service.collectMerchant.create(ctx.request.body);

      ctx.body = {
        status: true,
        code: 200,
        data: res,
        msg: 'success',
      };
    } catch (e) {
      ctx.logger.error(e);
      ctx.body = {
        status: false,
        code: 500,
        errors: e.errors,
        msg: e.errors.message,
      };
    }
  }
  async destroy() {
    const { ctx } = this;

    try {
      ctx.validate({
        id: { type: 'string' },
      });
    } catch (e) {
      ctx.body = {
        status: false,
        code: 500,
        errors: e,
        msg: '参数错误',
      };
      return;
    }

    const { id } = ctx.request.body;
    try {
      const record = await ctx.service.collectMerchant.queryById(id);
      if (!record) {
        ctx.body = {
          status: false,
          code: 404,
          msg: '记录不存在',
        };
        return;
      }

      await ctx.service.collectMerchant.destroy(id);

      ctx.body = {
        status: true,
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      ctx.logger.error(error);
      ctx.body = {
        status: false,
        code: 500,
        errors: error.errors,
        msg: error.errors.message,
      };
    }
  }
}

module.exports = CollectMerchantController;
