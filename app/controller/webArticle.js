'use strict'

const Controller = require('egg').Controller

class WebArticleController extends Controller {
  // 保存文章
  async saveArticle() {
    const { ctx } = this
    try {
      ctx.validate(
        {
          username: { type: 'string' },
          userId: { type: 'int' },
          // articleId: { type: 'int' },
          title: { type: 'string' },
          summary: { type: 'string' },
          article: { type: 'string' },
        },
        ctx.request.body
      )
    } catch (e) {
      ctx.body = {
        status: false,
        code: 500,
        errors: e,
        msg: '参数错误',
      }
      return
    }

    try {
      // const { username, password } = ctx.request.body
      // const payload = {
      //   username,
      //   password,
      // }
      const res = await ctx.service.article.saveArticle(ctx.request.body)
      if (res) {
        ctx.body = {
          status: true,
          data: res,
          code: 200,
          msg: '用户登录成功',
        }
      } else {
        // 用户不存在
        ctx.body = {
          status: true,
          code: 405,
          msg: '用户不存在',
        }
      }
    } catch (error) {
      ctx.logger.error(error)
      ctx.body = {
        status: false,
        code: 500,
        errors: error.message,
        msg: error.message,
      }
    }
  }
  // 获取文章详情
  async queryArticle() {
    const { ctx } = this
    console.log(this.ctx.request.body)
    try {
      ctx.validate(
        {
          username: { type: 'string' },
          password: { type: 'string' },
          telephone: { type: 'string' },
        },
        ctx.request.body
      )
    } catch (e) {
      ctx.body = {
        status: false,
        code: 500,
        errors: e,
        msg: '参数错误',
      }
      return
    }

    try {
      const { username, password, telephone } = ctx.request.body
      const payload = {
        username,
        telephone,
        password,
      }
      const res = await ctx.service.webArticle.getArticleById(payload)
      ctx.logger.info('webArticle controller queryArticle方法结果', res)
      if (res) {
        const [data, created] = res
        if (created) {
          ctx.body = {
            status: true,
            code: 200,
            data,
            msg: '新用户注册成功',
          }
        } else {
          // 用户已存在
          ctx.body = {
            status: true,
            code: 406,
            msg: '该用户已存在',
          }
        }
      } else {
        // 用户注册失败
        ctx.body = {
          status: true,
          code: 500,
          msg: '注册失败',
        }
      }
    } catch (error) {
      ctx.logger.error(error)
      ctx.body = {
        status: false,
        code: 500,
        errors: error.message,
        msg: error.message,
      }
    }
  }
}
module.exports = WebArticleController
