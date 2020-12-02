'use strict';

const { Controller } = require('egg');

class PermissionController extends Controller {
  async index() {
    const { ctx, logger } = this;

    const { operator_id: userId, user_id: merchantUserId } = ctx.user;
    try {
      // 测试代码 要删除的！！ 要放到获取菜单的接口执行
      await ctx.service.merchantOperator.handlingOperatorRole();
      // end
      const res = await ctx.service.permission.query({
        userId,
        merchantUserId,
      });

      ctx.body = {
        data: res || [],
        code: 200,
        msg: 'success',
        timestamp: Date.now(),
      };
    } catch (error) {
      logger.error('[PermissionController index: ]', error);
      ctx.body = {
        status: false,
        code: 500,
        errors: error?.message,
        msg: error?.message,
      };
    }
  }
}

module.exports = PermissionController;
