'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await this.app.redis.get('ep.jks.token');
    this.logger.info('[HomeController index]', res);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
