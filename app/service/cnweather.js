'use strict';

const Service = require('egg').Service;


class CNWeatherService extends Service {
  /**
   * 聚合信息
   */
  async cnWeather(params) {
    const { ctx } = this;
    const { cityCode } = params;

    try {
      const result = await ctx.curl(`http://d1.weather.com.cn/weather_index/${cityCode}.html?_=${Date.now()}`, {
        dataType: 'script',
        // contentType: 'json',
        method: 'GET',
        headers: {
          Referer: 'http://www.weather.com.cn/',
        },
      });
      // eslint-disable-next-line no-new-func
      const fun = new Function(`${result.data};return {cityDZ:cityDZ,alarmDZ:alarmDZ,dataSK:dataSK,dataZS:dataZS,fc:fc}`);
      const json = fun();
      return json;
    } catch (error) {
      ctx.logger.error(error);
      throw new Error(error);
    }
  }
  /**
   * cityList
   */
  async cityList() {
    const { ctx } = this;

    try {
      const result = await ctx.curl('https://j.i8tq.com/weather2020/search/city.js', {
        dataType: 'script',
        // contentType: 'text/html',
        method: 'GET',
        headers: {
          Referer: 'http://www.weather.com.cn/',
        },
      });
      // eslint-disable-next-line no-new-func
      const fun = new Function(`${result.data};return city_data`);
      const json = fun();
      return json;
    } catch (error) {
      ctx.logger.error(error);
      throw new Error(error);
    }
  }
}

module.exports = CNWeatherService;
