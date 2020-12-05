// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle = require('../../../app/service/article');
import ExportCnweather = require('../../../app/service/cnweather');
import ExportCollectMerchant = require('../../../app/service/collectMerchant');
import ExportMerchant = require('../../../app/service/merchant');
import ExportMerchantMenu = require('../../../app/service/merchantMenu');
import ExportMerchantModualr = require('../../../app/service/merchantModualr');
import ExportMerchantOperator = require('../../../app/service/merchantOperator');
import ExportMerchantPersonRole = require('../../../app/service/merchantPersonRole');
import ExportMerchantRole = require('../../../app/service/merchantRole');
import ExportMerchantRolePermission = require('../../../app/service/merchantRolePermission');
import ExportOutside = require('../../../app/service/outside');
import ExportPermission = require('../../../app/service/permission');
import ExportWeb = require('../../../app/service/web');

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    cnweather: AutoInstanceType<typeof ExportCnweather>;
    collectMerchant: AutoInstanceType<typeof ExportCollectMerchant>;
    merchant: AutoInstanceType<typeof ExportMerchant>;
    merchantMenu: AutoInstanceType<typeof ExportMerchantMenu>;
    merchantModualr: AutoInstanceType<typeof ExportMerchantModualr>;
    merchantOperator: AutoInstanceType<typeof ExportMerchantOperator>;
    merchantPersonRole: AutoInstanceType<typeof ExportMerchantPersonRole>;
    merchantRole: AutoInstanceType<typeof ExportMerchantRole>;
    merchantRolePermission: AutoInstanceType<typeof ExportMerchantRolePermission>;
    outside: AutoInstanceType<typeof ExportOutside>;
    permission: AutoInstanceType<typeof ExportPermission>;
    web: AutoInstanceType<typeof ExportWeb>;
  }
}
