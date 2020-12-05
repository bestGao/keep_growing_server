// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollectMerchant = require('../../../app/controller/collectMerchant');
import ExportConsul = require('../../../app/controller/consul');
import ExportHome = require('../../../app/controller/home');
import ExportMerchantMenu = require('../../../app/controller/merchantMenu');
import ExportMerchantOperator = require('../../../app/controller/merchantOperator');
import ExportMerchantPersonRole = require('../../../app/controller/merchantPersonRole');
import ExportMerchantRole = require('../../../app/controller/merchantRole');
import ExportMerchantRolePermission = require('../../../app/controller/merchantRolePermission');
import ExportOutside = require('../../../app/controller/outside');
import ExportPermission = require('../../../app/controller/permission');
import ExportWeather = require('../../../app/controller/weather');
import ExportWeb = require('../../../app/controller/web');
import ExportWebArticle = require('../../../app/controller/webArticle');

declare module 'egg' {
  interface IController {
    collectMerchant: ExportCollectMerchant;
    consul: ExportConsul;
    home: ExportHome;
    merchantMenu: ExportMerchantMenu;
    merchantOperator: ExportMerchantOperator;
    merchantPersonRole: ExportMerchantPersonRole;
    merchantRole: ExportMerchantRole;
    merchantRolePermission: ExportMerchantRolePermission;
    outside: ExportOutside;
    permission: ExportPermission;
    weather: ExportWeather;
    web: ExportWeb;
    webArticle: ExportWebArticle;
  }
}
