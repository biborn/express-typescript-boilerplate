import { AuthorizationMiddleware } from './middleware/AuthorizationMiddleware';
import { CorsMiddleware } from './middleware/CorsMiddleware';
import { JsonParserMiddleware } from './middleware/JsonParserMiddleware';
import { CookieParserMiddleware } from './middleware/CookieParserMiddleware';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';
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

import { DebugLogger } from "./common/logger/DebugLogger";
import { DatabaseService } from "./service/DatabaseService";
import { ReporterService } from "./service/ReporterService";
import { StorageService } from "./service/StorageService";
import { IWebApplication } from "./common/webapplication/IWebApplication";
import { ExpressWebApplication } from "./common/webapplication/ExpressWebApplication";

import { AppConfig } from "./config/AppConfig";
import { ConfigurationMiddleware } from "./middleware/ConfigurationMiddleware";
import { ReporterMiddleware } from "./middleware/ReporterMiddleware";
import { NotFoundMiddleware } from "./middleware/NotFoundErrorMiddleware";
import { DefaultErrorMiddleware } from "./middleware/DefaultErrorMiddleware";
import { DefaultRouter } from "./router/DefaultRouter";
import { UrlEncodedMiddleware } from './middleware/UrlEncodedMiddleware';

export class Application extends ExpressWebApplication
  implements IWebApplication {
  private _config: any;

  constructor() {
    super();
    this._config = new AppConfig().get();
    this.setLogger(new DebugLogger(`${this._config.name}:Application`));
    this.logger.i("A new Express application created.");
    this.initServices();
    this.setMiddlewares();
    this.setRouters();
  }

  private initServices() {
    DatabaseService.connect();
    ReporterService.install();
    StorageService.getStorage();
  }

  private setMiddlewares() {
    // Before Only
    this.addMiddleware(new ConfigurationMiddleware());
    this.addMiddleware(new LoggerMiddleware(this.logger));
    this.addMiddleware(new CookieParserMiddleware());
    this.addMiddleware(new UrlEncodedMiddleware());
    this.addMiddleware(new JsonParserMiddleware());
    this.addMiddleware(new CorsMiddleware());
    this.addMiddleware(new AuthorizationMiddleware());
    // Before and After
    this.addMiddleware(new ReporterMiddleware());
    // After Only
    this.addMiddleware(new NotFoundMiddleware());
    this.addMiddleware(new DefaultErrorMiddleware());
  }

  private setRouters() {
    this.addRouter(new DefaultRouter());
  }
}
