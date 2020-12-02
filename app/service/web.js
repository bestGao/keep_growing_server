'use strict'

const Service = require('egg').Service

class CollectMerchantService extends Service {
  // 网页判断数据库是否有该用户名
  async queryByUsername(userInfo) {
    const { ctx } = this
    const { username } = userInfo
    const res = await ctx.model.WebUser.findOne({ where: { username } })
    return res
  }
}

module.exports = CollectMerchantService
