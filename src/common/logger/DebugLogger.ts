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

import * as debug from "debug";
import { ILogger } from "./ILogger";

export class DebugLogger implements ILogger {
  private _logger: debug.IDebugger;

  constructor(tag: string) {
    this._logger = debug(tag);
  }

  i(message: string): void {
    this._logger("I: %s", message);
  }

  d(message: string, error?: Error, showWarningOnProduction: boolean = false): void {
    if (process.env.NODE_ENV !== "production") {
      if (error !== void 0 && null !== error) {
        this._logger("D: %s", message);
        console.trace(error);
      } else {
        this._logger("D: %s", message);
      }
    } else {
      if (showWarningOnProduction) this.w(message);
    }
  }

  w(message: string, error?: Error): void {
    if (error !== void 0 && null !== error) {
      this._logger("W: %s", message);
      console.trace(error);
    } else {
      this._logger("W: %s", message);
    }
  }

  e(message: string, error: Error): void {
    this._logger("E: %s", message);
    console.trace(error);
  }
}