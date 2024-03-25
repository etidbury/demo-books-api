import type { Response } from "node-fetch";

export interface HTTPClientResponse extends Response {
  json: () => Promise<Record<string, unknown>>;
}

export enum HTTPResponseFormat {
  JSON = "json",
  XML = "xml",
}

export interface IHTTPResponseParser<TJsonResponse> {
  parseResponse(response: HTTPClientResponse): Promise<TJsonResponse>;
}
