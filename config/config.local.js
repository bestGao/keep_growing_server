'use strict'

module.exports = () => {
  return {
    // consul 服务发现配置
    // consul: {
    //   connect: true,
    //   fetchConfig: false, // 是否获取consul的配置
    //   server: {
    //     host: '127.0.0.1', // 注册中心ip地址 //192.168.1.200   121.37.134.143
    //     port: 18500, // 注册中心端口号
    //   },
    //   register: true,
    //   services: [
    //     // 服务发现列表
    //     {
    //       serviceName: 'common-service', // 服务Name
    //       referName: 'common-service', // 引用名，后续可用 app.services.referName 访问服务
    //       comment: '操作员相关', // 备注
    //       // address: '', // 服务的地址
    //     },
    //   ],
    // },

    // Redis配置
    redis: {
      app: false,
      agent: false,
      client: {
        host: '127.0.0.1',
        port: 6379,
        password: 123456,
        db: 0,
      },
    },

    sequelize: {
      app: false,
      agent: false,
      dialect: 'mysql',
      host: '127.0.0.1',
      // delegate: 'modelmysql',
      // baseDir: 'model/mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000, // 超时时间
      },
      port: 1101,
      database: 'keep_growing_web',
      username: 'root',
      password: '123456',
      timezone: '+08:00',
    },
  }
}
