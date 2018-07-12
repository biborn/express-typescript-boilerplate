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

import { RequestHandler, Request, Response, NextFunction } from "express";
import { ExpressHandler } from "../common/webapplication/ExpressHandler";

export class ConfigurationHandler extends ExpressHandler {
  constructor() {
    super("ConfigurationHandler");
  }

  private attachConfig(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    (request as any).config = { app: this.appConfig.get() };
    this.logger.d("Configuration attached to the request object.");
    return next();
  }

  public attachConfigHandler: RequestHandler = this.attachConfig.bind(this);
}
