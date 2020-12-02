/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = () => {
  return {
    // http 模块的授权中间件
    logger: {
      level: 'INFO',
      allowDebugAtProd: false,
    },

    // consul 服务发现配置
    consul: {
      server: {
        host: 'consul', // 正式环境的Consul的地址
        port: 8500, // 端口号
      },
    },
  };
};
