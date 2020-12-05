'use strict'

const Service = require('egg').Service

class WebArticleService extends Service {
  // 保存文章
  async saveArticle(articleInfo) {
    const { ctx, app } = this
    const {
      articleId: _id,
      title,
      username,
      userId,
      summary,
      article,
    } = articleInfo
    const res = await app.mongo.WebArticles.findOrCreate({
      where: { _id },
      defaults: {
        title,
        summary,
        article,
        userId,
        username,
      },
    })
    return res
  }
  // 根据ID获取文章详情
}

module.exports = WebArticleService
