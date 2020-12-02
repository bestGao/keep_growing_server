/* 商户下的操作员
 * 用户登录后先用merchantUserId在merchant_role表判断是否存在该条记录，不存在则新建一条超级管理员* 角色记录，并将该商户下的操作员(一般初始时只有一条)添加为超级管理员。
 */
'use strict';

const Service = require('egg').Service;
const serviceName = 'common-service';
class MerchantOperatorService extends Service {
  // 查询操作员列表
  async query(params) {
    const { ctx, app } = this;
    /* 调用后端接口获取商户下的操作员接口 */
    // ctx.logger.info('登录的用户信息', ctx.user, 'params', params);
    try {
      const host = await app.consultool.getServiceFromConsul(serviceName);
      const backendUrl =
        `${host}/eplate/nodejs/operator/list`;
      const { user_id, operator_id, party_id } = ctx.user;
      const operatorStr = JSON.stringify({ operator_id, party_id, user_id });
      const headers = {
        operator: operatorStr,
      };
      ctx.logger.info('py common-service服务：', backendUrl, params);
      const result = await ctx.curl(backendUrl, {
        dataType: 'json',
        data: params,
        headers,
      });
      ctx.logger.info('MerchantOperatorService返回结果', result);
      return result;
    } catch (error) {
      ctx.logger.error('MerchantOperatorService报错', error);
      throw new Error(error);
    }
  }
  // 给未设置角色的商户下的操作员分配角色
  async handlingOperatorRole() {
    const { ctx } = this;
    const { user_id, operator_id } = ctx.user;
    const isExistArr = await ctx.model.MerchantRole.findAll({
      where: {
        merchantUserId: user_id,
      },
      raw: true,
    });
    if (isExistArr?.length === 0) {
      // 用户未被分配角色
      ctx.logger.info('未设置角色的商户id', user_id);
      // 新增超级管理员角色
      const createResult = await ctx.model.MerchantRole.create({
        merchantUserId: user_id,
        name: '超级管理员',
        isAdmin: 1,
        status: 'enabled',
        modifyUserId: operator_id,
      });
      ctx.logger.info('新增超级管理员角色结果', createResult);
      if (createResult) {
      // 把该商户下的初始操作员设为超级管理员并添加到MerchantPersonRole表
        const payload = {
          page_no: 1,
          page_size: 500,
        };
        const operatorResult = await this.query(payload);
        // ctx.logger.info('为分配角色的商户下的操作员列表', 'operatorResult', operatorResult);
        if (operatorResult.status === 200) {
          const { data: { list = [] } } = operatorResult.data;
          if (list.length > 0) {
            const operatorArr = list.map(operatorItem => ({
              merchantUserId: user_id,
              userId: operatorItem.id,
              merchantRoleId: createResult.id,
              status: 'enabled',
              modifyUserId: operator_id,
            }));
            const createRoleResult = await ctx.model.MerchantPersonRole.bulkCreate(operatorArr);
            ctx.logger.info('初始化操作员权限角色结果', createRoleResult);
          }
        }
      } else {
        ctx.logger.error('新增超级管理员角色失败', createResult);
      }
    } else {
      ctx.logger.info('此商户id已经有角色', user_id);
      return true;
    }
  }
  // 添加操作员
  async addOperator(params) {
    const { ctx, app } = this;
    /* 调用后端添加操作员接口 */
    // ctx.logger.info('登录的用户信息', ctx.user, 'params', params);
    try {
      const host = await app.consultool.getServiceFromConsul(serviceName);
      const backendUrl =
        `${host}/eplate/nodejs/operator/add`;
      const { user_id, operator_id, party_id } = ctx.user;
      const headers = {
        operator: JSON.stringify({ operator_id, party_id, user_id }),
      };
      const customParams = {};
      if (params.hasOwnProperty('roles')) {
        // eslint-disable-next-line
        Object.keys(params).filter(pi => pi !== 'roles').forEach(item => customParams[item] = params[item]);
      }
      // ctx.logger.info('参数', customParams);
      const result = await ctx.curl(backendUrl, {
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded', // 通过 contentType 告诉 HttpClient 以 form 格式发送, 这是post的默认值
        data: customParams,
        headers,
        method: 'POST',
      });
      // ctx.logger.info('MerchantOperatorService返回结果', result);
      if (result.status === 200) {
        ctx.logger.info('调用添加操作员接口结果', result.data);
        if (result.data.code !== 200) {
          return result.data;
        }
        // 添加操作员成功后给改操作员绑定角色
        const { id } = result.data.data;
        const payload = { userId: id, merchantUserId: user_id, roles: params.roles, modifyUserId: operator_id };
        let addRoleResult = false;
        addRoleResult = await this.service.merchantPersonRole.update(payload);
        ctx.logger.info('调用设置操作员角色service结果', addRoleResult);
        if (!addRoleResult) {
          result.data.data.code = 500;
          result.data.data.setRole = false;
          result.data.data.msg = '设置操作员权限报错';
        } else {
          result.data.data.setRole = true;
        }
      }
      ctx.logger.info('添加操作员service返回结果', result);
      return result;
    } catch (error) {
      ctx.logger.error('Service的addOperator报错', error);
      throw new Error(error);
    }
  }
  // 编辑操作员
  async editOperator(params) {
    const { ctx, app } = this;
    /* 调用后端编辑操作员接口 */
    // ctx.logger.info('登录的用户信息', ctx.user, 'params', params);
    try {
      const host = await app.consultool.getServiceFromConsul(serviceName);
      const backendUrl =
          `${host}/eplate/nodejs/operator/edit`;
      const { user_id, operator_id, party_id } = ctx.user;
      const headers = {
        operator: JSON.stringify({ operator_id, party_id, user_id }),
      };
      const result = await ctx.curl(backendUrl, {
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded', // 通过 contentType 告诉 HttpClient 以 form 格式发送
        data: params,
        headers,
        method: 'POST',
      });
      ctx.logger.info('后端编辑操作员接口返回结果', result);
      if (result.status === 200) {
        ctx.logger.info('调用后端编辑操作员接口结果', result.data);
        // 添加操作员成功后给改操作员绑定角色
        const { operator_id: id } = params;
        const payload = { userId: id, merchantUserId: user_id, roles: params.roles, modifyUserId: operator_id };
        let addRoleResult = false;
        addRoleResult = await this.service.merchantPersonRole.update(payload);
        ctx.logger.info('调用设置操作员角色service结果', addRoleResult);
        result.data.data = {};
        if (!addRoleResult) {
          result.data.data.code = 500;
          result.data.data.setRole = false;
          result.data.data.msg = '设置操作员权限报错';
        } else {
          result.data.data.setRole = true;
        }
      }
      return result;
    } catch (error) {
      ctx.logger.error('Service的editOperator报错', error);
      throw new Error(error);
    }
  }
  // 重置操作员密码
  async resetPassword(params) {
    const { ctx, app } = this;
    /* 调用后端重置操作员密码接口 */
    // ctx.logger.info('登录的用户信息', ctx.user, 'params', params);
    try {
      const host = await app.consultool.getServiceFromConsul(serviceName);
      const backendUrl =
        `${host}/eplate/nodejs/operator/reset_operator_pwd`;
      const { user_id, operator_id, party_id } = ctx.user;
      const headers = {
        operator: JSON.stringify({ operator_id, party_id, user_id }),
      };
      ctx.logger.info('调用后端编辑操作员参数', params);
      const result = await ctx.curl(backendUrl, {
        dataType: 'json', // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        contentType: 'application/x-www-form-urlencoded', // 通过 contentType 告诉 HttpClient 以 form 格式发送
        data: params,
        headers,
        method: 'PUT',
      });
      ctx.logger.info('后端重置操作员密码接口返回结果', result);
      return result;
    } catch (error) {
      ctx.logger.error('Service的resetPassword报错', error);
      throw new Error(error);
    }
  }
}

module.exports = MerchantOperatorService;
