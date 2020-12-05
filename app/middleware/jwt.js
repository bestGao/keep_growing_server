'use strict'
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken') //引入jsonwebtoken

module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    let authToken = ctx.header.authorization // 获取header里的authorization
    authToken = authToken.split(' ')[1]
    app.logger.info('middleware中的jwt获取token', authToken)
    if (authToken) {
      // authToken = authToken.substring(7)
      const { isValid, userId, msg } = verifyToken(authToken, app.logger)
      app.logger.info('验证token后', isValid, userId)
      if (isValid && userId) {
        // res.corpid &&  如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // app.logger.error('loginedUserArr', app.loginedUserArr, app)
        // if (app.loginedUserArr.includes(userId)) {
        // ctx.body = { code: 50012, msg: '您的账号已在其他地方登录' }
        // } else {
        await next()
        // }
      } else {
        ctx.body = { code: 50012, msg }
      }
    } else {
      ctx.body = { code: 50008, msg: '请登陆后再进行操作' }
    }
  }
}

// 解密，验证
function verifyToken(token, logger) {
  const cert = fs.readFileSync(
    path.join(__dirname, '../public/rsa_public_key.pem')
  ) // 公钥，看后面生成方法
  let res = { isValid: false }
  try {
    const result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
    logger.info('验证token结果', result)
    const { iat, exp } = result ?? {}
    // 开始时间小于结束时间，代表token还有效
    if (iat && exp) {
      res.isValid = iat <= exp ? true : false
      res.userId = result?.data.userId
      res.msg = 'token验证成功'
    }
  } catch (e) {
    logger.error('verifyToken报错', e.name)
    if (e.name === 'TokenExpiredError') {
      res.msg = 'token已过期'
    } else if (e.name === 'JsonWebTokenError') {
      res.msg = '无效的token'
    }
  }
  return res
}
