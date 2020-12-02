'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

const cityData = require('../utils/city.json');

class WeatherController extends Controller {
  async cnWeather() {
    const { ctx } = this;
    const { province, city, region } = ctx.query;
    let { cityCode } = ctx.query;

    try {
      ctx.validate({
        province: { type: 'string?' },
        city: { type: 'string?' },
        region: { type: 'string?' },
        cityCode: { type: 'string?' },
      });

      if (!cityCode) {
        if (!province || !city || !region) {
          ctx.body = {
            status: false,
            code: 500,
            msg: '参数错误',
          };
          return;
        }
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        status: false,
        code: 500,
        error,
        msg: '参数错误',
      };
      return;
    }

    try {
      // const cityData = await ctx.service.cnweather.cityList();
      cityCode = cityCode || cityData[province][city][region].AREAID;
      const result = await ctx.service.cnweather.cnWeather({
        cityCode: cityCode || '101010100',
      });

      if (result) {
        ctx.body = {
          status: true,
          code: 200,
          data: result,
          msg: 'success',
        };
      } else {
        ctx.body = {
          status: false,
          code: 500,
          msg: '查询失败',
        };
        ctx.logger.error(result);
      }
    } catch (error) {
      ctx.body = {
        status: false,
        code: 500,
        msg: error.message,
      };
      ctx.logger.error(error);
    }
  }
  /**
   * updateCity
   */
  async updateCity() {
    const { ctx } = this;
    try {
      const cityData = await ctx.service.cnweather.cityList();

      if (cityData) {
        const data = JSON.stringify(cityData);
        fs.writeFile(`${path.join(process.cwd(), './app/utils/city.json')}`, data, err => {
          if (err) throw err;
          console.log('文件已被保存');
        });

        ctx.body = {
          status: true,
          code: 200,
          msg: '更新成功',
        };
      }
    } catch (error) {
      ctx.body = {
        status: false,
        code: 500,
        msg: error.message,
      };
    }
  }
}

module.exports = WeatherController;