'use strict'

const Controller = require('egg').Controller

class WebController extends Controller {
  // 网页登录
  async login() {
    const { ctx } = this
    console.log(this.ctx.request.body)
    try {
      ctx.validate(
        {
          username: { type: 'string' },
          password: { type: 'string' },
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
      const { username, password } = ctx.request.body
      const payload = {
        username,
        password,
      }
      const res = await ctx.service.web.queryByUsername(payload)
      if (res) {
        if (res.password === password) {
          // 该用户存在
          ctx.body = {
            status: true,
            code: 200,
            msg: '用户登录成功',
          }
        } else {
          ctx.body = {
            status: true,
            code: 500,
            msg: '用户名密码不匹配',
          }
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
}

module.exports = WebController
