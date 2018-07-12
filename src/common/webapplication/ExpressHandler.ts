/**
 * Copyright 2018, Danang Galuh Tegar Prasetyo.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Response, NextFunction } from "express";
import { IResponse } from "./IResponse";
import { AppConfig } from "../../config/AppConfig";
import { DebugLogger } from "../logger/DebugLogger";
import { IConfig } from "../config/IConfig";
import { ILogger } from "../logger/ILogger";

const has = require("lodash.has");
const isEmpty = require("lodash.isempty");

export class ExpressHandler {
  protected appConfig: IConfig;
  protected tag: string;
  protected logger: ILogger;

  constructor(tag: string = "express-handler") {
    this.tag = tag;
    this.appConfig = new AppConfig();
    this.logger = new DebugLogger(this.appConfig.get("name") + ":" + tag);
  }

  public sendResponse(response: Response, ...args: any[]) {
    if ("undefined" === typeof this) return;
    if (response === void 0) throw new Error("Express Response is not given.");
    const obj = this.buildResponseObject(...args);
    return response.status(obj.code).json(obj);
  }

  public notifyError(next: NextFunction, ...args: any[]) {
    if ("undefined" === typeof this) return;
    if (next === void 0) throw new Error("Express Next Function is not given.");
    const obj = this.buildResponseObject(false, ...args);
    const error =
      "undefined" === typeof obj.message ? new Error() : new Error(obj.message);
    return next(error);
  }

  protected buildResponseObject(...args: any[]): IResponse {
    const obj: IResponse = {
      success: true,
      code: 200,
    }
    for (const [index, arg] of args.entries()) {
      if ("boolean" === typeof arg || arg instanceof Boolean) {
        obj.success = arg as boolean;
      } else if ("number" === typeof arg || arg instanceof Number) {
        obj.code = arg as number;
      } else if ("string" === typeof arg || arg instanceof String) {
        obj.message = arg as string;
      } else if ("object" === typeof arg || arg instanceof Object) {
        if (has(arg, "report") && Object.keys(arg).length === 1)
          obj.report = arg.report;
        else if (!isEmpty(arg)) obj.data = arg;
      }
    }
    return obj;
  }
}
