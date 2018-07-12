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

import * as bluebird from "bluebird";
import * as mongoose from "mongoose";
import { ILogger } from "./../common/logger/ILogger";
import { DebugLogger } from "../common/logger/DebugLogger";
import { AppConfig } from "../config/AppConfig";
import { DatabaseConfig } from "../config/DatabaseConfig";

class Service {
  private static _instance: Service = new Service();
  private appConfig: AppConfig;
  private databaseConfig: DatabaseConfig;
  private logger: ILogger;

  constructor() {
    if (Service._instance) {
      throw new Error(
        "Error: Instantiation failed: Use Service.getInstance() instead of new."
      );
    }
    this.appConfig = new AppConfig();
    this.databaseConfig = new DatabaseConfig("mongodb");
    this.logger = new DebugLogger(
      this.appConfig.get("name") + ":DatabaseService"
    );
    Service._instance = this;
  }

  public static getInstance(): Service {
    return Service._instance;
  }

  private buildUri(): string {
    const host = this.databaseConfig.get("host", "localhost");
    const port = this.databaseConfig.get("port", 27017);
    const dbname = this.databaseConfig.get("dbname", "test");
    const username = this.databaseConfig.get("username", null);
    const password = this.databaseConfig.get("password", null);
    const authDb = this.databaseConfig.get("authdb", "admin");
    const identifier =
      username !== null && password !== null
        ? `${username}:${encodeURIComponent(password)}@`
        : "";
    const options =
      username !== null && password !== null ? `?authSource=${authDb}` : "";
    return `mongodb://${identifier}${host}:${port}/${dbname}${options}`;
  }

  private buildOptions(): mongoose.ConnectionOptions {
    return {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    };
  }

  public async connect() {
    (mongoose as any).Promise = bluebird.Promise;
    try {
      await mongoose.connect(
        this.buildUri(),
        this.buildOptions()
      );
      this.logger.i("Database connection established. Provider: MongoDB.");
    } catch (err) {
      const error = new Error(err);
      this.logger.e(`Failed to connect to database. Reason: ${error}`, error);
      this.logger.i("Exiting process...");
      process.exit(1);
    }
  }
}

export const DatabaseService = Service.getInstance();
