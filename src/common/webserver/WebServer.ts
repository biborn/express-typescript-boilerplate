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

import * as http from "http";
import * as https from "https";
import { ILogger } from "../logger/ILogger";
import { IWebServer } from "./IWebServer";
import { IWebServerCredentials } from "./IWebServerCredentials";

export class WebServer implements IWebServer {
  private _bind: string;
  private _isSecureServer: boolean;
  private _logger: ILogger;
  private _port: string | number | boolean;
  private _server: http.Server | https.Server;

  constructor(
    requestHandler: any,
    port: number | string,
    credentials?: IWebServerCredentials
  ) {
    this._port = this.normalizePort(port);
    if (this._port === false) {
      throw new Error("Invalid port.");
    }
    this._bind =
      typeof this._port === "string"
        ? "Pipe " + this._port
        : "Port " + this._port;
    this._isSecureServer = credentials !== void 0;
    this._logger = null;
    this._server =
      this._isSecureServer
        ? https.createServer(credentials, requestHandler)
        : http.createServer(requestHandler);
    this.setDefaultEventListener();
  }

  private normalizePort(val: number | string): number | string | boolean {
    const port = parseInt(val as string, 10);
    if (isNaN(port)) {
      return port;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  public addEventListener(
    event: string,
    listener: (...args: any[]) => void
  ): void {
    this._server.on(event, listener);
  }

  public setDefaultEventListener(): void {
    this.addEventListener("error", error => {
      if (error.syscall !== "listen") {
        this._logger.e("System error.", error);
      }
      switch (error.code) {
        case "EACCES":
          if (null !== this._logger) {
            this._logger.e(
              this._bind + " requires elevated privileges.",
              error
            );
          }
          process.exit(1);
          break;
        case "EADDRINUSE":
          if (null !== this._logger) {
            this._logger.e(
              this._bind + " requires elevated privileges.",
              error
            );
          }
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    this.addEventListener("listening", () => {
      if (null !== this._logger) {
        const secureMessage = this._isSecureServer ? " (HTTPS enabled)" : "";
        this._logger.i(`WebServer is listening on ${this._bind}${secureMessage}.`);
      }
    });
    this.addEventListener("close", () => {
      if (null !== this._logger) {
        const secureMessage = this._isSecureServer ? " (HTTPS enabled)" : "";
        this._logger.i(`WebServer stops listen on ${this._bind}${secureMessage}.`);
      }
    });
  }

  public setLogger(logger: ILogger): void {
    this._logger = logger;
  }

  public start(): void {
    if (null !== this._logger) {
      const secureMessage = this._isSecureServer ? " (HTTPS enabled)" : "";
      this._logger.i(`Starting WebServer service${secureMessage}.`);
    }
    this._server.listen(this._port);
  }

  public stop(): void {
    if (null !== this._logger) {
      const secureMessage = this._isSecureServer ? " (HTTPS enabled)" : "";
      this._logger.i(`Stoping WebServer service${secureMessage}.`);
    }
    this._server.close();
  }
}