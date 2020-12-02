/* eslint valid-jsdoc: "off" */

'use strict'
const pathMatching = require('egg-path-matching')
const { ip, dockerId } = require('../app/utils/util')
const localIP = ip.address()
const localPort = 9000

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1601341204090_1441'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
      },
    },

    // consul 服务发现配置
    // consul: {
    //   connect: true, // 是否初始化连接Consul, 默认False
    //   fetchConfig: true, // 是否获取consul的配置
    //   server: {
    //     host: "consul", // 注册中心ip地址 //192.168.1.200   121.37.134.143
    //     port: 8500, // 注册中心端口号
    //   },
    //   register: true, // 是否注册当前模块，默认为false
    //   id: `${dockerId}:nodejs-merchant-service`, // id (String, optional): check ID
    //   // serviceid (String, optional): service ID, associate check with existing service
    //   // http (String): url to test, 2xx passes, 429 warns, and all others fail
    //   name: "nodejs-merchant-service", // name (String): check name
    //   address: localIP, // address (String, optional): service IP address
    //   port: localPort, // port (Integer, optional): service port
    //   // meta (Object, optional): metadata linked to the service instance
    //   tags: ["development", "nodejs"], // tags (String[], optional): service tags
    //   check: {
    //     http: `http://${localIP}:${localPort}/consul/health`, // 健康检测地址
    //     interval: "5s", // 健康检测间隔
    //     notes: "http service check",
    //     status: "critical", // status (String, optional): initial service status
    //   },
    //   services: [
    //     // // 服务发现列表
    //     // {
    //     //   serviceName: 'merchant-admin-aggregator', // 服务Name
    //     //   referName: 'merchant-admin-aggregator', // 引用名，后续可用 app.services.referName 访问服务
    //     //   comment: '实时收费列表', // 备注
    //     //   // address: '', // 服务的地址
    //     // },
    //     {
    //       serviceName: "common-service", // 服务Name
    //       referName: "common-service", // 引用名，后续可用 app.services.referName 访问服务
    //       comment: "操作员相关", // 备注
    //       // address: '', // 服务的地址
    //     },
    //   ],
    // },

    // http 模块的授权中间件
    middleware: ['httpAuth'],
    httpAuth: {
      match: pathMatching({
        ignore: "/consul/",
        ignore: /\/login$/,
        ignore: /\/registry$/
      }),
    },

    // 跨域配置
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },

    // Redis配置
    redis: {
      app: false,
      agent: false,
    },

    // 日志配置
    logger: {
      level: 'INFO',
      allowDebugAtProd: false,
      dir: `${appInfo.baseDir}/logs/`,
      appLogName: `${appInfo.name}.log`,
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
    },
  }

  return {
    cluster: {
      listen: {
        port: localPort,
      },
    },
    ...config,
    ...userConfig,
  }
}
