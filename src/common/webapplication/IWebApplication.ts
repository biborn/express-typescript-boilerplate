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

import { IMiddleware } from "./IMiddleware";
import { IRouter } from "./IRouter";
import { ILogger } from "../logger/ILogger";
import { IWebServer } from "../webserver/IWebServer";
import { IWebServerCredentials } from "../webserver/IWebServerCredentials";

export interface IWebApplication {
  addMiddleware(middleware: IMiddleware): void;
  addRouter(router: IRouter): void;
  build(port: number | string, credentials?: IWebServerCredentials): IWebServer;
  setLogger(logger: ILogger): void;
}