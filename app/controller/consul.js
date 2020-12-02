'use strict';

const { Controller } = require('egg');

class ConsulController extends Controller {
  async health() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: 'success',
      timestamp: Date.now(),
    };
  }
}

module.exports = ConsulController;
