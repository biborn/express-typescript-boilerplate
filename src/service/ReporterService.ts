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

import * as Raven from "raven";
import { ILogger } from "../common/logger/ILogger";
import { DebugLogger } from "../common/logger/DebugLogger";
import { AppConfig } from "../config/AppConfig";
import { ReporterConfig } from "../config/ReporterConfig";

class Service {
  private static _instance: Service = new Service();
  private appConfig: AppConfig;
  private reporterConfig: ReporterConfig;
  private logger: ILogger;

  constructor() {
    if (Service._instance) {
      throw new Error(
        "Error: Instantiation failed: Use Service.getInstance() instead of new."
      );
    }
    this.appConfig = new AppConfig();
    this.reporterConfig = new ReporterConfig("raven");
    this.logger = new DebugLogger(
      this.appConfig.get("name") + ":ReporterService"
    );
    Service._instance = this;
  }

  public static getInstance(): Service {
    return Service._instance;
  }

  public install() {
    if (null === this.reporterConfig.get("DSN")) {
      this.logger.w(
        `Reporting service is disabled. Reason: "No DSN provided for Raven Sentry."`
      );
    } else {
      Raven.config(this.reporterConfig.get("DSN")).install();
      this.logger.i("Reporting service is active. Provider: Raven Sentry.");
    }
  }
  public requestHandler = Raven.requestHandler();

  public errorHandler = Raven.errorHandler();
}

export const ReporterService = Service.getInstance();
