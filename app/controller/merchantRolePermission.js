'use strict';

const Controller = require('egg').Controller;

class MerchantRolePermissionController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      ctx.validate({
        merchantRoleId: { type: 'string', required: false },
        merchantUserId: { type: 'string', required: false },
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

    try {
      const res = await ctx.service.merchantRolePermission.query({
        ...ctx.query,
        merchantUserId: ctx.query?.merchantUserId ?? ctx.user.user_id,
      });

      ctx.body = {
        status: true,
        code: 200,
        data: res,
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

  async queryByUserId() {
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

    try {
      const res = await ctx.service.merchantRolePermission.queryByUserId(ctx.query.userId);

      ctx.body = {
        status: true,
        code: 200,
        data: res,
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
    ctx.logger.info(ctx.request.body);
    try {
      ctx.validate({
        merchantRoleId: { type: 'int' },
        // type: { type: 'string', max: 10, trim: true },
        // pageId: { type: 'string', max: 200, trim: true, required: false },
        // pageOperationId: { type: 'string', max: 200, trim: true, required: false },
        // status: { type: 'enum', values: [ 'enabled', 'disabled' ] },
        // remark: { type: 'string', max: 255, required: false },
        pages: { type: 'array', min: 1 },
        operations: { type: 'array', required: false },
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
        pages,
        operations,
        merchantRoleId,
      } = ctx.request.body;
      const { user_id: merchantUserId, operator_id: userId } = ctx.user;

      const res = await ctx.service.merchantRolePermission.update({
        merchantUserId,
        userId,
        pages,
        operations,
        merchantRoleId,
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
        errors: e?.errors,
        msg: e?.errors?.message ?? e.message,
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
      ctx.service.merchantRolePermission.update({
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
      const record = await ctx.service.merchantRolePermission.queryById(id);
      if (!record) {
        ctx.body = {
          status: false,
          code: 404,
          msg: '记录不存在',
        };
        return;
      }

      await ctx.service.merchantRolePermission.destroy(id);

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

module.exports = MerchantRolePermissionController;
