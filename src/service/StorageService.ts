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

import * as GoogleCloudStorage from "@google-cloud/storage";
import { ILogger } from "../common/logger/ILogger";
import { DebugLogger } from "../common/logger/DebugLogger";
import { AppConfig } from "../config/AppConfig";
import { StorageConfig } from "../config/StorageConfig";

class Service {
  private static _instance: Service = new Service();
  private appConfig: AppConfig;
  private storageConfig: StorageConfig;
  private logger: ILogger;
  private storage: GoogleCloudStorage.Storage;

  constructor() {
    if (Service._instance) {
      throw new Error(
        "Error: Instantiation failed: Use Service.getInstance() instead of new."
      );
    }
    this.appConfig = new AppConfig();
    this.storageConfig = new StorageConfig();
    this.logger = new DebugLogger(
      this.appConfig.get("name") + ":StorageService"
    );
    this.storage = GoogleCloudStorage(this.buildConfiguration());
    Service._instance = this;
  }

  public static getInstance(): Service {
    return Service._instance;
  }

  private buildConfiguration(): GoogleCloudStorage.ConfigurationObject {
    this.logger.i(
      "Cloud storage service is active. Provider: Google Cloud Storage."
    );
    return {
      projectId: this.storageConfig.get("project_id", null),
      keyFilename: this.storageConfig.get("key_filename", null)
    };
  }

  public getStorage(): GoogleCloudStorage.Storage {
    return this.storage;
  }

  public getBucket(bucketName: string): GoogleCloudStorage.Bucket {
    return this.storage.bucket(bucketName);
  }
}

export const StorageService = Service.getInstance();