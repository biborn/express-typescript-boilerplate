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

import axios from "axios";
import has = require("lodash.has");
import { RequestHandler, Request, Response, NextFunction } from "express";
import { ExpressHandler } from "../common/webapplication/ExpressHandler";
import { ErrorHandler } from "./ErrorHandler";
import User from "./../model/UserModel";

export class AuthorizationHandler extends ExpressHandler {
  constructor() {
    super("auth-handler");
  }

  private async checkAuth(request: Request, response: Response, next: NextFunction) {
    const errorHandler = new ErrorHandler().defaultHandler;
    try {
      // Check token using axios
      return this.attachAuth(request, response, next);
    } catch (err) {
      const error = new Error(err);
      return errorHandler(error, request, response, next);
    }
  }

  private attachAuth(request: Request, response: Response, next: NextFunction) {
    const user: any = new User();
    user.username = "danang-id";
    user.name = "Danang Galuh Tegar Prasetyo";
    (request as any).user = user;
    return next();
  }

  public checkAuthHandler: RequestHandler = this.checkAuth.bind(this);
}
