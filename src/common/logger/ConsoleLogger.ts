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
  
    private _tag: string;

  constructor(tag: string) {
      this._tag = tag;
  }

  i(message: string): void {
    console.info("%s I: %s", this._tag, message);
  }

  d(message: string): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug("%s D: %s", this._tag, message);
    }
  }

  w(message: string, error?: Error): void {
    if (null !== error) {
      console.warn("%s W: %s", this._tag, message);
      console.trace(error);
    } else {
      console.warn("%s W: %s", this._tag, message);
    }
  }

  e(message: string, error: Error): void {
    console.error("%s E: %s", this._tag, message);
    console.trace(error.stack);
  }
}
