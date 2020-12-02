'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const { app, logger, request } = ctx;

    if (!options.match(request.url)) {
      logger.info('middleware httpAuth ignore');
      await next();
    }

    const Authorization = ctx.get('Authorization') || '';
    logger.info(`httpAuth get Authorization: ${Authorization}`);

    const token = Authorization.replace('Bearer ', '');
    const keyName = `ep.session.admin_token:${token}`;
    try {
      let validRedisStr = await app.redis.get(keyName) || '';

      validRedisStr = validRedisStr.replace(/'/g, '"').replace(/None/g, null);
      const validRedisJson = JSON.parse(validRedisStr);
      const tokenIsValid = token && validRedisJson && validRedisJson.operator_id;
      logger.debug(`redis parse: ${validRedisJson}`);

      if (tokenIsValid) {
        ctx.user = validRedisJson;
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: 'token无效',
        };
      }
    } catch (e) {
      logger.error('[httpAuth validate token]', e);
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'token无效',
      };
    }
  };
};
