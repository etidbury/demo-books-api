// import fs from "fs";
import type { Response } from "node-fetch";

// import { convertXML } from "simple-xml-to-json";
export type HTTPClientResponse = Response;

export enum HTTPResponseFormat {
  JSON = "json",
  XML = "xml",
}

export interface IHTTPResponseParser<TJsonResponse> {
  parseResponse(response: HTTPClientResponse): Promise<TJsonResponse>;
}

// export async function formatParser<
//   TJsonResponse extends Record<string, unknown>,
// >(response: Response, format: HTTPResponseFormat) {
//   switch (format) {
//     case HTTPResponseFormat.JSON:
//       return response.json() as unknown as TJsonResponse;
//     case HTTPResponseFormat.XML:
//       const text = await response.text();

//       fs.writeFileSync(format + "pre-response." + format, text);

//       return convertXML(text) as unknown as TJsonResponse;
//     default:
//       throw new Error("fetchWithFormat(): Unsupported format specified");
//   }
// } //todo: create unit tests
