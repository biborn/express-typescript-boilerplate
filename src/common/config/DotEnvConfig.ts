/**.
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

import * as dotenv from "dotenv";
import { IConfig } from "./IConfig";

export class DotEnvConfig implements IConfig {
  private _namespace: string;
  private _tag: string;

  constructor(namespace: string = "DotEnvConfig", tag: string = "") {
    if (
      "undefined" === typeof process.env.DOTENV_LOADED &&
      !Boolean(process.env.DOTENV_LOADED)
    ) {
      dotenv.config();
    }
    this._namespace = namespace;
    this._tag = tag.toUpperCase();
  }

  private getDotEnvKey(key: string): string {
    if (this._tag === "") {
      return key.toUpperCase();
    } else {
      return this._tag.concat("_", key.toUpperCase());
    }
  }

  private getKey(dotEnvKey: string): string {
    if (this._tag === "") {
      return dotEnvKey.toLowerCase();
    } else {
      return dotEnvKey.substring(this._tag.length + 1).toLowerCase();
    }
  }

  private isTagKey(dotEnvKey: string): boolean {
    return dotEnvKey.substr(0, this._tag.length).toUpperCase() === this._tag;
  }

  getKeys(): string[] {
    let keys: string[] = [];
    for (let k in process.env) {
      if (this.isTagKey(k)) {
        keys.push(this.getKey(k));
      }
    }
    return keys;
  }

  get(key?: string, defaultReturn?: any, saveDefault: boolean = false): any {
    let config: any = {};
    if (key === void 0) {
      for (let k in process.env) {
        if (this.isTagKey(k)) {
          config[this.getKey(k)] = process.env[k];
        }
      }
    } else {
      config = process.env[this.getDotEnvKey(key)];
      if (null === config) {
        if (defaultReturn !== void 0) {
          config = defaultReturn;
          if (saveDefault) this.put(key, config);
        }
      }
    }
    return config;
  }

  put(key: string, config: any): void {
    process.env[this.getDotEnvKey(key)] = config;
  }

  getNamespace(): string {
    return this._namespace;
  }
}