'use strict'
const path = require('path')
// const ConsulTool = require('./app/utils/consultool');

// app.js
class AppBootHook {
  constructor(app) {
    this.app = app
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // this.app.logger.info('configWillLoad');
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // 例如：加载自定义的目录
    const dir = path.join(this.app.config.baseDir, 'app/mongo')
    const pro = this.app.mongoose.Model
    this.app.loader.loadToApp(dir, 'mongo', {
      inject: this.app,
      caseStyle: 'upper',
      filter(model) {
        return typeof model === 'function' && model.prototype instanceof pro
      },
    })

    this.app.logger.info('didLoad')
    this.app.logger.info('app.config.env:', this.app.config.env)

    // 例如：创建自定义应用的示例
    // this.app.queue = new Queue(this.app.config.queue);
    // await this.app.queue.init();

    this.app.services = {}
    this.app.loginedUserArr = []
    this.app.parkPortMap = {}
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
    // const { model } = this.app
    // 初始化数据库
    // model.sync({ force: false })
    this.app.logger.info('willReady')

    // try {
    //   // 从Consul把配置文件取下来
    //   const consultool = new ConsulTool(this.app);
    //   this.app.consultool = consultool;
    //   await consultool.initConsul();
    //   this.app.logger.info('fetch Config from Consul...');
    //   if (this.app.config.consul.fetchConfig) {
    //     const config = await consultool.fetchConfig('nodejs/merchant-server');
    //     this.setEggConfig(config);
    //   }

    // } catch (error) {
    //   this.app.logger.error('[fetchConfig has error]', error);
    // }
  }

  setEggConfig(resultJSON) {
    this.app.logger.info('进来了吗', resultJSON)
    // 取出Redis的配置
    const redisHost = resultJSON.redis.host
    const redisPort = resultJSON.redis.port
    const redisPassword = resultJSON.redis.password
    const redisDB = resultJSON.redis.db
    const redisConfig = {
      host: redisHost,
      port: redisPort,
      password: redisPassword,
      db: redisDB,
    }
    // this.app.logger.info(this.app.config.redis);
    if (this.app.config.redis) {
      this.app.config.redis.client = redisConfig
    }
    this.app.logger.info(
      'RedisConfig:',
      redisHost,
      redisPort,
      redisPassword,
      redisDB
    )

    // Sequelize
    this.app.config.sequelize = {
      dialect: 'mysql',
      timezone: '+08:00',
      ...resultJSON.sequelize,
    }
    this.app.logger.info('SequelizeConfig:', resultJSON.sequelize)

    // 取出MQ的配置信息
    const MQProtocol = resultJSON.rabbitmq.protocol
    const MQHost = resultJSON.rabbitmq.host
    const MQPort = resultJSON.rabbitmq.port
    const MQUsername = resultJSON.rabbitmq.username
    const MQPassword = resultJSON.rabbitmq.password
    const MQHeartbeat = resultJSON.rabbitmq.heartbeat
    const MQConfig = {
      protocol: MQProtocol,
      host: MQHost,
      port: MQPort,
      username: MQUsername,
      password: MQPassword,
      heartbeat: MQHeartbeat || 2000,
    }
    this.app.config.rabbitmq = MQConfig
    this.app.logger.info(
      'MQConfig:',
      MQHost,
      MQPort,
      MQUsername,
      MQPassword,
      MQHeartbeat
    )
  }

  async didReady() {
    // 应用已经启动完毕
    this.app.logger.info('didReady')
    await this.initRedis()
    // await this.initMongodb()
    await this.initSequelize()
  }

  async initRedis() {
    try {
      const redis = require('egg-redis/lib/redis')
      redis(this.app)
      const redisConf = this.app.config.redis
      this.app.logger.info(
        `initRedis, host:${redisConf.client.host}, port:${redisConf.client.port}`
      )
    } catch (error) {
      this.app.logger.info(error)
    }
  }

  async initSequelize() {
    try {
      const sequelize = require('egg-sequelize/lib/loader')
      sequelize(this.app)
      const sequelizeConf = this.app.config.sequelize
      this.app.logger.info(
        `initSequelize, host:${sequelizeConf.host}, port:${sequelizeConf.port}`
      )
    } catch (error) {
      this.app.logger.info(error)
    }
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    this.app.logger.info('serverDidReady')
  }

  // async beforeClose() {
  //   // 请将您的 app.beforeClose 中的代码置于此处。
  //   this.app.logger.info('beforeClose');
  //   try {
  //     await this.app.consultool.unregisterToConsul();
  //   } catch (error) {
  //     this.app.logger.error('[beforeClose error]', error);
  //   }
  // }
}

module.exports = AppBootHook
