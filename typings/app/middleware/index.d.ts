// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHttpAuth = require('../../../app/middleware/httpAuth');

declare module 'egg' {
  interface IMiddleware {
    httpAuth: typeof ExportHttpAuth;
  }
}
