import type { RequestInit } from "node-fetch";
import fetch from "node-fetch";

import type { HTTPClientResponse, IHTTPResponseParser } from "./format-parser";
import { HTTPResponseFormat } from "./format-parser";

// const MAP_FORMAT_TO_CONTENT_TYPE = {
//   [HTTPResponseFormat.JSON]: "application/json",
//   [HTTPResponseFormat.XML]: "application/atom+xml",
// };

export async function fetchWithFormat<TExpectedParsedResponse>(
  url: string,
  searchParams: URLSearchParams,
  parser: IHTTPResponseParser<TExpectedParsedResponse>,
  fetchOptions?: RequestInit,
): ReturnType<IHTTPResponseParser<TExpectedParsedResponse>["parseResponse"]> {
  const _url = new URL(url);
  _url.search = searchParams.toString();

  const response = await fetch(_url, fetchOptions);

  if (!response.ok) {
    console;
    throw new Error(
      `fetchWithFormat(): Failed to fetch: ${await response.text()} (code: ${
        response.status
      })`,
    );
  }

  return parser.parseResponse(response);

  // const responseFormatted = await formatParser<TJsonResponse>(response, format);

  // const validatedFields = schema.safeParse(responseFormatted);

  // if (!validatedFields.success) {
  //   console.log(responseFormatted);
  //   console.log(validatedFields.error);

  //   fs.writeFileSync(
  //     JSON.stringify(validatedFields.error, null, 2),
  //     format + ".xxxxx." + format + ".error.json",
  //   );
  //   throw new Error(`fetchWithFormat(): Failed to parse response`);
  // }

  // return schema.parse(responseFormatted);
}

export { HTTPResponseFormat, IHTTPResponseParser, HTTPClientResponse };
