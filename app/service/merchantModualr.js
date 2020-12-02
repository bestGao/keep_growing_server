'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const { or } = Sequelize.Op;

class MerchantMenuService extends Service {
  async queryModularPermission({ merchantUserId, merchantType }) {
    const { ctx, logger } = this;
    const { sequelize } = ctx.model.MerchantModualr;

    if (!merchantType) {
      const merchantInfo = await ctx.service.merchant.queryInfo();
      logger.info('[商户详情]', merchantInfo);
      merchantType = merchantInfo?.merchant_type;
      logger.info('[商户类型]', merchantType);
    }

    const modualrs = await ctx.model.Modular.findAll({
      where: {
        status: 'enabled',
        [or]: [
          {
            openingType: 'auto',
          },
          {
            openingType: 'merchant_type_auto',
          },
          {
            id: {
              [Sequelize.Op.in]: sequelize.literal(`(SELECT modular_id FROM merchant_modualr WHERE merchant_user_id = ${merchantUserId} AND status = 'enabled' AND delete_time IS NULL)`),
            },
          },
        ],
      },
      attributes: [ 'id', 'name', 'openingType', 'merchantType' ],
      // raw: true,
      // nest: true,
      include: [
        {
          model: ctx.model.Page,
          required: false,
          where: {
            status: 'enabled',
          },
          attributes: [ 'id', 'modularId', 'name', 'code', 'path', 'remark' ],
        },
        {
          model: ctx.model.PageOperation,
          as: 'pageOperation',
          required: false,
          where: {
            status: 'enabled',
          },
          attributes: [ 'id', 'modularId', 'pageId', 'name', 'code', 'remark' ],
        },
      ],
    });

    const permission = modualrs.filter(item => {
      if (item.openingType === 'merchant_type_auto') {
        if (item.merchantType.split(',').includes(merchantType)) {
          return true;
        }
      } else {
        return true;
      }
    });
    const res = permission.reduce((acc, cur) => {
      acc.pages = acc.pages.concat(cur.pages);
      acc.operations = acc.operations.concat(cur.pageOperation);
      return acc;
    }, { pages: [], operations: [] });

    return JSON.parse(JSON.stringify(res));
  }
}

module.exports = MerchantMenuService;
