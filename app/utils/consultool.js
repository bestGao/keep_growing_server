'use strict';

// const amqp = require('amqplib');

class ConsulTool {
  constructor(app) {
    this.app = app;
  }

  /**
   * 初始化Consul
   */
  async initConsul() {
    const consulConf = this.app.config.consul;
    if (consulConf.connect) {
      const initConf = Object.assign(
        {
          promisify: true, // promisify (Boolean|Function, optional): convert callback methods to promises
          secure: false, // secure (Boolean, default: false): enable HTTPS
        },
        consulConf.server
      );
      this.app.logger.info('initConsul, config:', initConf);
      const consul = require('consul')(initConf);
      this.app.consul = consul;
    }

    // 是否注册该服务
    if (consulConf.register && this.app.consul) {
      this.app.logger.info(`register to Consul, ${JSON.stringify(consulConf)}`);
      await this.app.consul.agent.service.register(consulConf);
    } else {
      this.app.logger.info('ignore register this service to Consul');
    }
  }

  async unregisterToConsul() {
    const consulConf = this.app.config.consul;
    if (consulConf.register && this.app.consul) {
      this.app.logger.info(
        `deregister to Consul, ${JSON.stringify(consulConf)}`
      );
      await this.app.consul.agent.service.deregister({ id: consulConf.id });
    } else {
      this.app.logger.info('ignore deregister this service to Consul');
    }
  }

  async initConsulServices() {
    const consulConf = this.app.config.consul;
    this.app.logger.info('initConsulServices...');
    this.app.services = Object.assign({}, this.app.services);
    // 获取服务地址
    if (consulConf.services && consulConf.services.length > 0) {
      const { services } = consulConf;
      for (const elem of services) {
        const { referName, serviceName, address } = elem;
        if (address) {
          this.app.services[referName] = address;
        } else {
          const nodesResult = await this.app.consul.catalog.service.nodes(
            serviceName
          );
          if (!nodesResult || nodesResult.length <= 0) {
            this.app.logger.warn(
              `get service from consul failed, ${serviceName}, nodesResult is null`
            );
            continue;
          }
          const { ServiceAddress, ServicePort } = nodesResult[0];
          const ServiceUrl = `http://${ServiceAddress}:${ServicePort}`;
          this.app.logger.debug(
            `service from consul, ${serviceName}: ${ServiceUrl}`
          );
          this.app.services[referName] = ServiceUrl;
        }
      }
    }
    this.app.logger.info('app.services:', this.app.services);
  }

  /**
   * 从Consul服务器获取配置文件
   */
  async fetchConfig(key) {
    const result = await this.app.consul.kv.get(key);
    // this.app.logger.info(result);
    if (result) {
      const resultValue = Array.isArray(result)
        ? result[Object.keys(result)[0]].Value
        : result.Value;
      this.app.logger.info('[consul fetchConfig]', key, resultValue);
      const resultJSON = JSON.parse(resultValue);

      return resultJSON;
    }
  }

  async initRabbitmq() {
    // // 1. 创建链接对象
    // // guest:guest@localhost:5672
    // const rabbitmq = this.app.config.rabbitmq;
    // this.app.logger.info(
    //   `initRabbitmq, host:${rabbitmq.host}, port: ${rabbitmq.port}, username:${rabbitmq.username}`
    // );
    // // const aa = {
    // //   protocol: 'amqp',
    // //   hostname: 'localhost',
    // //   port: 5672,
    // //   username: 'guest',
    // //   password: 'guest',
    // //   locale: 'en_US',
    // //   frameMax: 0,
    // //   heartbeat: 0,
    // //   vhost: '/',
    // // };
    // const connection = await amqp.connect({
    //   protocol: 'amqp',
    //   hostname: rabbitmq.host,
    //   port: rabbitmq.port,
    //   username: rabbitmq.username,
    //   password: rabbitmq.password,
    // });
    // if (!connection) {
    //   this.app.logger.error('connect Rabbitmq failed.');
    //   return;
    // }

    // // 2. 获取通道
    // const channel = await connection.createChannel();
    // if (!channel) {
    //   this.app.logger.error('createChannel channel failed.');
    //   return;
    // }

    // const exchangeName = 'real_time_charging'; // 交换机名
    // const exchangeType = 'fanout'; // exchangeType
    // const queueName = 'baihuagu_queue'; // 队列名
    // // const routingKey = 'direct_routingKey';

    // this.app.logger.info(
    //   `bindQueue, exchange:${exchangeName}, type: ${exchangeType}, queue: ${queueName}.`
    // );
    // // 3. 声明交换机
    // await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    // // 4. 声明队列
    // await channel.assertQueue(queueName, {
    //   autoDelete: false,
    //   durable: false,
    // });

    // // 5. 绑定关系（队列、交换机、路由键）
    // await channel.bindQueue(queueName, exchangeName, '');

    // this.app.logger.info('start consume message...');
    // // 6. 消费
    // await channel.consume(
    //   queueName,
    //   async msg => {
    //     const msgStr = msg.content.toString();
    //     this.app.logger.info('has msg from rabbitmq:', msgStr);

    //     let payload;
    //     try {
    //       payload = JSON.parse(msg.content.toString());
    //       this.app.logger.debug('parse msg use json format success:', payload);
    //     } catch (error) {
    //       this.app.logger.error('parse msg use json format failed', error);
    //       return;
    //     }

    //     try {
    //       this.app.messenger.sendToApp('action_rabbitmq_msg', payload);
    //       this.app.logger.debug(
    //         'send action to app, action: action_rabbitmq_msg'
    //       );
    //     } catch (error) {
    //       this.app.logger.error('send action to app failed.', error);
    //     }
    //   },
    //   {
    //     // noAck: true 则服务器端不会期望收到 ACK，也就是说，消息在被发送后会立即出列。
    //     // noAck: false 则需要消费者发送 ACK，即channel.ack(msg);
    //     // 但如果超时未回复 ACK，消息会重新排队（但如果同时有其他可用消费者，则会迅速安排过去）
    //     noAck: true,
    //   },
    //   this.app.logger.info('rabbitmq start, do consumer')
    // );
    // this.app.amqp = { channel };
  }

  // async initRedis() {
  //   try {
  //     const redis = require('egg-redis/lib/redis');
  //     redis(this.app);
  //     const redisConf = this.app.config.redis;
  //     this.app.logger.info(
  //       `initRedis, host:${redisConf.client.host}, port:${redisConf.client.port}`
  //     );
  //   } catch (error) {
  //     this.app.logger.info(error);
  //   }
  // }

  async getServiceFromConsul(serviceName) {
    this.app.logger.debug(`start getServiceFromConsul: ${serviceName}`);
    try {
      const checksNode = await this.app.consul.health.checks(serviceName);
      if (!checksNode || checksNode.length <= 0) {
        throw new Error(`${serviceName} checks health has no node.`);
      }

      const serviceNodes = await this.app.consul.catalog.service.nodes(
        serviceName
      );
      if (!serviceNodes || serviceNodes.length <= 0) {
        throw new Error(`${serviceName} service has no node.`);
      }
      for (const snode in serviceNodes) {
        const { ServiceID, ServiceAddress, ServicePort } = serviceNodes[snode];
        for (const cnode in checksNode) {
          const CServiceID = checksNode[cnode].ServiceID;
          const CStatus = checksNode[cnode].Status;
          if (ServiceID === CServiceID && CStatus === 'passing') {
            const hostUrl = `http://${ServiceAddress}:${ServicePort}`;
            this.app.logger.info(
              `getServiceFromConsul : ${serviceName} => ${hostUrl}`
            );
            return hostUrl;
          }
        }
      }
    } catch (error) {
      this.app.logger.error(`找不到该服务:${serviceName}`, error);
    }
  }

  // async selectSocketAndSendMsg(payload) {
  //   this.app.logger.info('selectSocketAndSendMsg:', payload);

  //   if (!payload) {
  //     this.app.logger.error('payload is null, quit');
  //     return;
  //   }
  //   // 该方法需要在Worker进程调用，Worker维护WebSocket的连接
  //   const nsp = this.app.io.of('/baihuagu');

  //   // 通过查找app.userArr内 的停车场的userParkingID 找到socketID 后发送消息给socketID
  //   // 可能有多个socketID
  //   const userObj = this.app.userObj;
  //   const vehicleLaneId = payload.vehicle_lane_id;
  //   if (userObj && vehicleLaneId) {
  //     this.app.logger.info(
  //       `search WebSocketId for vehicle_lane_id:${vehicleLaneId}`
  //     );
  //     Object.keys(userObj).forEach(async uItem => {
  //       try {
  //         // 逗号分割的字符
  //         const userPortID = userObj[uItem].userportID;
  //         const userPortIDStr = userPortID ? userPortID.toString() : '';
  //         // 分割成数组
  //         const userPortIDArray = userPortIDStr.split(',');
  //         if (userPortIDArray.includes(vehicleLaneId.toString())) {
  //           const userInfoObj = userObj[uItem] || {};
  //           this.app.logger.info(
  //             `find WebSocketId: ${uItem}, send msg, action:subCar. vehicleLaneId:${vehicleLaneId}, User:${userInfoObj.toString()}`
  //           );
  //           await nsp.emit(uItem, { data: { action: 'subCar', payload } });
  //         }
  //       } catch (e) {
  //         this.app.logger.error('循环查询WebSocket连入的用户程序报错:', e);
  //       }
  //     });
  //   } else {
  //     this.app.logger.info('selectSocketAndSendMsg, userObj is null');
  //   }
  // }
}

module.exports = ConsulTool;
