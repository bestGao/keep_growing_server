'use strict';

const Controller = require('egg').Controller;
const { filterParams } = require('../utils/util');

class MerchantRoleController extends Controller {
  async index() {
    const { ctx } = this;

    // try {
    //   ctx.validate({
    //     userId: { type: 'string' },
    //   }, ctx.query);
    // } catch (e) {
    //   ctx.body = {
    //     status: false,
    //     code: 500,
    //     errors: e,
    //     msg: '参数错误',
    //   };
    //   return;
    // }

    const { pageSize = 10, pageNo = 1, ...otherQuery } = ctx.query;
    const query = { limit: parseInt(pageSize, 10), offset: parseInt(pageSize * (pageNo - 1), 10) };
    const merchantUserId = ctx.user.user_id;

    try {
      const { count, rows } = await ctx.service.merchantRole.query({
        merchantUserId,
        ...query,
        ...filterParams(otherQuery),
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
    ctx.logger.info(ctx.request.body);
    try {
      ctx.validate({
        // merchantUserId: { type: 'int' },
        name: { type: 'string', max: 200, trim: true },
        isAdmin: { type: 'boolean' },
        status: { type: 'enum', values: [ 'enabled', 'disabled' ] },
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
      const {
        // merchantUserId,
        name,
        isAdmin,
        status,
      } = ctx.request.body;
      const { user_id: merchantUserId, operator_id: userId } = ctx.user;
      const res = await ctx.service.merchantRole.create({
        merchantUserId,
        name,
        isAdmin,
        status,
        modifyUserId: userId,
      });

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

  // 启用/禁用
  async updateStatus() {
    const { ctx } = this;

    try {
      ctx.logger.info(ctx.request.body);
      ctx.validate({
        id: { type: 'id' },
        status: { type: 'enum', values: [ 'enabled', 'disabled' ] },
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
      const { operator_id: modifyUserId } = ctx.user;
      ctx.service.merchantRole.update({
        ...ctx.request.body,
        modifyUserId,
      });

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

  async destroy() {
    const { ctx } = this;

    try {
      ctx.validate({
        id: { type: 'int' },
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
      const record = await ctx.service.merchantRole.queryById(id);
      if (!record) {
        ctx.body = {
          status: false,
          code: 404,
          msg: '记录不存在',
        };
        return;
      }

      await ctx.service.merchantRole.destroy(id);

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

module.exports = MerchantRoleController;
