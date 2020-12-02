'use strict';

const Controller = require('egg').Controller;

class MerchantPersonRoleController extends Controller {
  async index() {
    const { ctx } = this;

    // const userId = ctx.user.operator_id;
    const { operator_id, user_id: merchantUserId } = ctx.user;
    const {
      userId = operator_id,
    } = ctx.query;

    try {
      const res = await ctx.service.merchantPersonRole.query({
        userId,
        merchantUserId,
      });

      const data = res.map(item => ({
        id: item.id,
        merchantUserId: item.merchantUserId,
        merchantRoleId: item.merchantRoleId,
        merchantRoleName: item?.merchantRole?.name,
        status: item.status,
      }));

      ctx.body = {
        status: true,
        code: 200,
        data,
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
  async update() {
    const { ctx } = this;

    try {
      ctx.validate({
        userId: { type: 'int' },
        roles: { type: 'array', min: 1 },
        // status: { type: 'enum', values: [ 'enabled', 'disabled' ] },
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
        userId,
        roles,
        // status,
      } = ctx.request.body;
      const {
        user_id: merchantUserId,
        operator_id: modifyUserId,
      } = ctx.user;
      await ctx.service.merchantPersonRole.update({
        merchantUserId,
        userId,
        roles,
        // status,
        modifyUserId,
      });

      ctx.body = {
        status: true,
        code: 200,
        // data: res,
        msg: 'success',
      };
    } catch (e) {
      ctx.logger.error(e);
      ctx.body = {
        status: false,
        code: 500,
        errors: e?.errors,
        msg: e?.errors?.message ?? e.message,
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
      const record = await ctx.service.merchantPersonRole.queryById(id);
      if (!record) {
        ctx.body = {
          status: false,
          code: 404,
          msg: '记录不存在',
        };
        return;
      }

      await ctx.service.merchantPersonRole.destroy(id);

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

module.exports = MerchantPersonRoleController;
