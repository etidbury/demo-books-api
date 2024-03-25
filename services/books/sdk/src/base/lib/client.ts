import type { HTTPResponseFormat } from "@acme/http-api-client";

export class BaseBookSearchApiClient {
  constructor(protected readonly format: HTTPResponseFormat) {}
}
