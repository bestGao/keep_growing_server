'use strict';

const Service = require('egg').Service;

class OutsideService extends Service {
  /**
   * aliWeather
   */
  aliWeather(params) {
    const { ctx } = this;

    const result = ctx.curl('http://apifreelat.market.alicloudapi.com/whapi/json/aliweather/briefforecast3days', {
      dataType: 'json',
      // contentType: 'json',
      method: 'POST',
      data: {
        ...params,
      },
      headers: {
        Authorization: ctx.header.authorization,
      },
    });
    return result;
  }
}

module.exports = OutsideService;