'use strict'

const Controller = require('egg').Controller

class WebController extends Controller {
  // 网页登录
  async login() {
    const { ctx } = this
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
          const data = { userinfo: res }
          // token生成
          const token = ctx.helper.loginToken({ userid: res.id }, 600)
          // 保存到redis
          await ctx.app.redis.set(token, JSON.stringify(res), 'EX', 600) // 7200秒后过期
          // 当前登录的userId
          ctx.app.loginedUserArr.push(res.id)
          data.token = token
          data.expires = 600
          ctx.body = {
            status: true,
            data,
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
  // 网页注册
  async registry() {
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
      const res = await ctx.service.web.createUser(payload)
      ctx.logger.info('web controller registry方法结果', res)
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
module.exports = WebController
