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

import * as m from "mongoose";

/**
 * Collection will be turned into plural lowercase.
 * Example: "User" refers to collection named "users".
 */
export const Collection: string = "User";
const NewSchema: Function = m.Schema;

export const Schema: m.Schema = NewSchema({
  username: String,
  name: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});

export const Model: m.Model<m.Document> = m.model(Collection, Schema);
export default Model;
