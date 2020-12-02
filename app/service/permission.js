'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
  // 查询id
  async query({ userId, merchantUserId }) {
    const { ctx, logger } = this;

    try {

      // 查询用户权限
      const mpr = await ctx.service.merchantPersonRole.query({ userId });
      logger.info('[merchantPersonRole.query]查询操作员的角色', mpr);
      let hasAdmin = false;
      const roles = [];
      // 查询商户菜单
      logger.info('[merchantPersonRole.query]查询商户菜单', merchantUserId);
      const menus = await ctx.service.merchantMenu.query({ merchantUserId });

      mpr.forEach(item => {
        // 查询是否还有超级管理员权限
        if (item.merchantRole.isAdmin) {
          hasAdmin = true;
        }
        // 用户所有角色
        roles.push(item.merchantRoleId);
      });
      logger.info('[Permission query 是否为超级管理员]', hasAdmin);

      let mrp = { operations: [], pages: [] };
      if (hasAdmin) { // 查询所有页面、操作
        // mrp = await ctx.service.merchantRolePermission.query({
        //   merchantUserId,
        // });
        logger.info('[查询超级管理员的所属modualr 的所有权限]', merchantUserId);
        mrp = await ctx.service.merchantModualr.queryModularPermission({ merchantUserId });
      } else if (roles.length) {
        // 角色的相关页面、操作
        logger.info('[Permission query 所有角色]', roles);

        mrp = await ctx.service.merchantRolePermission.query({
          merchantRoleId: roles,
        });
      }

      // const { operations = [], pages = [] } = mrp;
      // // 操作归类到页面
      // operations.forEach(operation => {
      //   const matchPage = pages.filter(page => page.id === operation.pageId)[0];

      //   if (matchPage) {
      //     matchPage.actions = matchPage.actions || [];
      //     matchPage.actions.push(operation);
      //   }
      // });

      // pages.forEach(page => {
      //   const matchMenu = menus.filter(menu => menu.pageId && menu.pageId === page.id)[0];

      //   if (matchMenu) {
      //     matchMenu.children = matchMenu.children || [];
      //     matchMenu.children.push(page);
      //   }
      // });

      return {
        menus,
        // operations,
        ...mrp,
      };
    } catch (error) {
      logger.error('[Permission query error]', error);
      return Promise.reject(error);
    }
  }
}

module.exports = PermissionService;
