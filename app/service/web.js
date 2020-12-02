'use strict'

const Service = require('egg').Service

class WebService extends Service {
  // 网页判断数据库是否有该用户名
  async queryByUsername(userInfo) {
    const { ctx } = this
    const { username } = userInfo
    const res = await ctx.model.WebUser.findOne({ where: { username } })
    return res
  }
  // 用户注册
  async createUser(userInfo) {
    const { ctx } = this
    const { username, password, telephone } = userInfo
    const res = await ctx.model.WebUser.findOrCreate({
      where: { username },
      defaults: {
        password,
        telephone
      }
    });
    return res
  }
}

module.exports = WebService
