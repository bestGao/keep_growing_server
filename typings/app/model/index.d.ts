// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollectMerchant = require('../../../app/model/collectMerchant');
import ExportMerchantMenu = require('../../../app/model/merchantMenu');
import ExportMerchantModualr = require('../../../app/model/merchantModualr');
import ExportMerchantPersonRole = require('../../../app/model/merchantPersonRole');
import ExportMerchantRole = require('../../../app/model/merchantRole');
import ExportMerchantRolePermission = require('../../../app/model/merchantRolePermission');
import ExportModular = require('../../../app/model/modular');
import ExportPage = require('../../../app/model/page');
import ExportPageOperation = require('../../../app/model/pageOperation');
import ExportWebUser = require('../../../app/model/webUser');

declare module 'egg' {
  interface IModel {
    CollectMerchant: ReturnType<typeof ExportCollectMerchant>;
    MerchantMenu: ReturnType<typeof ExportMerchantMenu>;
    MerchantModualr: ReturnType<typeof ExportMerchantModualr>;
    MerchantPersonRole: ReturnType<typeof ExportMerchantPersonRole>;
    MerchantRole: ReturnType<typeof ExportMerchantRole>;
    MerchantRolePermission: ReturnType<typeof ExportMerchantRolePermission>;
    Modular: ReturnType<typeof ExportModular>;
    Page: ReturnType<typeof ExportPage>;
    PageOperation: ReturnType<typeof ExportPageOperation>;
    WebUser: ReturnType<typeof ExportWebUser>;
  }
}
