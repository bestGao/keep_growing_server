'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 网页注册
  router.post('/keep_growing/web/registry', controller.web.registry);
  // 网页登录
  router.post('/keep_growing/web/login', controller.web.login);

  router.post('/nodejs/outside/aliweather', controller.outside.aliWeather);
  router.get('/nodejs/weather/cnweather', controller.weather.cnWeather);
  router.post('/nodejs/weather/updatecity', controller.weather.updateCity);

  router.get('/nodejs/collectmerchant', controller.collectMerchant.index);
  router.post('/nodejs/collectmerchant/create', controller.collectMerchant.create);
  router.post('/nodejs/collectmerchant/destroy', controller.collectMerchant.destroy);

  /**
   * consul
   */
  router.get('/consul/health', controller.consul.health);

  /**
   * 用户权限
   */
  router.get('/nodejs/merchant/permission', controller.permission.index);

  /**
   * 角色列表
   */
  router.get('/nodejs/merchant/merchantRole', controller.merchantRole.index);
  router.post('/nodejs/merchant/merchantRole/create', controller.merchantRole.create);
  router.post('/nodejs/merchant/merchantRole/updateStatus', controller.merchantRole.updateStatus);

  /* 商户下的操作员 */
  // 列表
  router.get('/nodejs/merchant/merchantOperators', controller.merchantOperator.index);
  // 添加操作员
  router.post('/nodejs/merchant/merchantOperators/create', controller.merchantOperator.add);
  // 编辑操作员
  router.post('/nodejs/merchant/merchantOperators/update', controller.merchantOperator.update);
  // 重置操作员密码
  router.post('/nodejs/merchant/merchantOperators/resetPassword', controller.merchantOperator.resetPassword);

  /**
   * 用户角色
   */
  // 查询
  router.get('/nodejs/merchant/merchantPersonRole', controller.merchantPersonRole.index);
  // 更新角色
  router.post('/nodejs/merchant/merchantPersonRole/update', controller.merchantPersonRole.update);

  /**
   * 角色权限
   */
  router.get('/nodejs/merchant/merchantRolePermission', controller.merchantRolePermission.index);
  // 指定用户角色权限
  router.get('/nodejs/merchant/merchantRolePermission/queryByUserId', controller.merchantRolePermission.queryByUserId);
  // 编辑角色权限
  router.post('/nodejs/merchant/merchantRolePermission/update', controller.merchantRolePermission.update);

  /**
   * 菜单
   */
  router.get('/nodejs/merchant/merchantMenu', controller.merchantMenu.index);
};
