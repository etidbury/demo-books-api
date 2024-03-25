import type * as Zod from "zod";

import {
  fetchWithFormat,
  HTTPResponseFormat,
  IHTTPResponseParser,
} from "@acme/http-api-client";

export class BaseBookSearchApiClient {
  constructor(protected readonly format: HTTPResponseFormat) {}
}
