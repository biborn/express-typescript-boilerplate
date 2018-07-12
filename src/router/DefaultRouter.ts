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

import { IRouter } from "../common/webapplication/IRouter";
import { ExpressRouter } from "../common/webapplication/ExpressRouter";
import { DefaultHandler } from '../handler/DefaultHandler';

export class DefaultRouter extends ExpressRouter implements IRouter {
  private _defaultHandler: DefaultHandler;

  constructor() {
    super("/");
    this.handler
    this._defaultHandler = new DefaultHandler();
    this.setRoutes();
  }

  private setRoutes() {
    this.handler.get("/", this._defaultHandler.defaultHandler);
  }
}
