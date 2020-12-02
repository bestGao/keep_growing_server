/* 商户下的操作员 */
'use strict';

const Controller = require('egg').Controller;
const { filterParams } = require('../utils/util');
class MerchantOperatorController extends Controller {
  // 查询操作员列表
  async index() {
    const { ctx } = this;
    const {
      page_no,
      page_size,
      real_name,
    } = ctx.query;
    try {
      const res = await ctx.service.merchantOperator.query({
        ...filterParams({
          page_no,
          page_size,
          real_name,
        }),
      });
      // ctx.logger.info('ctx.service.merchantOperator.query返回结果', res);
      ctx.body = {
        ...res.data,
        msg: res.status === 200 ? 'success' : 'error',
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
  // 添加操作员
  async add() {
    const { ctx } = this;

    try {
      ctx.validate({
        roles: { type: 'array', min: 1 },
        login_name: { type: 'string' },
        password: { type: 'string' },
        real_name: { type: 'string' },
        mobile: { type: 'string' },
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
        login_name,
        password,
        real_name,
        mobile,
        roles,
      } = ctx.request.body;
      const addResult = await ctx.service.merchantOperator.addOperator({
        login_name,
        password,
        real_name,
        mobile,
        roles,
      });
      ctx.logger.info('添加操作员controller返回结果', addResult);
      ctx.body = addResult.data ?? addResult;
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
  // 编辑操作员
  async update() {
    const { ctx } = this;
    try {
      ctx.validate({
        roles: { type: 'array', min: 1 },
        operator_id: { type: 'int' },
        real_name: { type: 'string' },
        mobile: { type: 'string' },
        status: { type: 'enum', values: [ 'confirm', 'enable', 'disable' ] },
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
        operator_id,
        real_name,
        mobile,
        roles,
        status,
      } = ctx.request.body;
      const resetResult = await ctx.service.merchantOperator.editOperator({
        operator_id,
        real_name,
        mobile,
        status,
        roles,
      });
      ctx.logger.info('node编辑操作员密码接口返回结果', resetResult);
      ctx.body = resetResult.data ?? resetResult;
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
  // 重置操作员密码
  async resetPassword() {
    const { ctx } = this;

    try {
      ctx.validate({
        operator_id: { type: 'string' },
        password: { type: 'string' },
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
        operator_id,
        password,
      } = ctx.request.body;
      const resetResult = await ctx.service.merchantOperator.resetPassword({
        operator_id,
        password,
      });
      ctx.logger.info('node重置操作员密码接口返回结果', resetResult);
      ctx.body = resetResult.data ?? resetResult;
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
}

module.exports = MerchantOperatorController;
