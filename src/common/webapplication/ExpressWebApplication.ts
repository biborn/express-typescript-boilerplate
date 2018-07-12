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

import * as express from "express";
import { Application } from "express";
import { IMiddleware } from "./IMiddleware";
import { IRouter } from "./IRouter";
import { IWebApplication } from "./IWebApplication";
import { ILogger } from "../logger/ILogger";
import { IWebServer } from "../webserver/IWebServer";
import { IWebServerCredentials } from "../webserver/IWebServerCredentials";
import { WebServer } from "../webserver/WebServer";

export class ExpressWebApplication implements IWebApplication {
  protected app: Application;
  protected logger: ILogger;
  protected midlewares: IMiddleware[];
  protected name: string;
  protected routers: IRouter[];

  constructor(name: string = "Express App", app: Application = express()) {
    this.app = app;
    this.logger = null;
    this.midlewares = [];
    this.name = name;
    this.routers = [];
  }

  addMiddleware(middleware: IMiddleware): void {
    this.midlewares.push(middleware);
  }

  addRouter(router: IRouter): void {
    this.routers.push(router);
  }

  build(
    port: number | string,
    credentials?: IWebServerCredentials
  ): IWebServer {
    for (const m of this.midlewares) {
      if ("undefined" !== typeof m.before) {
        this.app.use(m.before);
        if (null !== this.logger)
          this.logger.i(
            `Before middleware "${m.name}" registered to ${this.name}.`
          );
      }
    }
    for (const r of this.routers) {
      this.app.use(r.path, r.handler);
      if (null !== this.logger)
        this.logger.i(
          `Router for path "${r.path}" registered to ${this.name}.`
        );
    }
    for (const m of this.midlewares) {
      if ("undefined" !== typeof m.after) {
        this.app.use(m.after);
        if (null !== this.logger)
          this.logger.i(`After middleware "${m.name}" added to ${this.name}.`);
      }
    }
    if (null !== this.logger) {
      this.logger.i("WebServer instance created from Express application.");
    }
    return new WebServer(this.app, port, credentials);
  }

  setLogger(logger: ILogger): void {
    this.logger = logger;
  }
}