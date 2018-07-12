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

export class DefaultHandler extends ExpressHandler {
  constructor() {
    super("DefaultHandler");
  }

  private default(request: Request, response: Response, next: NextFunction) {
    this.sendResponse(
      response,
      "Your App is successfuly running!",
      (request as any).user
    );
  }

  public defaultHandler: RequestHandler = this.default.bind(this);
}
