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

import * as morgan from "morgan";
import { RequestHandler } from "express";
import { ILogger } from "./../common/logger/ILogger";
import { IMiddleware } from "../common/webapplication/IMiddleware";
import { ExpressMiddleware } from "../common/webapplication/ExpressMiddleware";

export class LoggerMiddleware extends ExpressMiddleware implements IMiddleware {
  private _logger: ILogger;

  constructor(logger: ILogger) {
    super("LoggerMiddleware");
    this._logger = logger;
  }

  before: RequestHandler = morgan("combined", {
    stream: {
      write: message => {
        this._logger.i(message.substring(0, message.lastIndexOf("\n")));
      }
    }
  });
}
