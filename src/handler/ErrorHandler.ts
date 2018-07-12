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

import { RequestHandler, Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express-serve-static-core";
import { ExpressHandler } from "../common/webapplication/ExpressHandler";
import { IReport } from "./../common/webapplication/IReport";

export class ErrorHandler extends ExpressHandler {
  constructor() {
    super("ErrorHandler");
  }

  private default(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const code: number = (error as any).status || 500;
    if (!error.message || error.message == "") {
      if (code === 404) error.message = "Route not found.";
    }
    const reportObject: IReport =
      "undefined" !== typeof (response as any).sentry
        ? {
            report: (response as any).sentry
          }
        : {};
    if (code === 500) this.logger.d(error.message, error, true);
    else this.logger.d(error.message, null, true);
    const obj = this.buildResponseObject(
      false,
      next,
      code,
      reportObject,
      error.message,
      (error as any).data
    );
    return response.status(code).json(obj);
  }

  private notFound(request: Request, response: Response, next: NextFunction) {
    const error = new Error();
    (error as any).status = 404;
    return next(error);
  }

  public defaultHandler: ErrorRequestHandler = this.default.bind(this);
  public notFoundHandler: RequestHandler = this.notFound.bind(this);
}
