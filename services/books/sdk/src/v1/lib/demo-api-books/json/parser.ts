import {
  IBookItem,
  TBookPrimaryAuthor,
  TBookPrimaryISBN,
  TBookPrimaryPrice,
} from "@acme/books-shared";
import { random } from "@acme/common";
import { HTTPClientResponse, IHTTPResponseParser } from "@acme/http-api-client";

import { DemoApiBookSearchResponseSchemaJSON } from "./schema";

export class DemoApiBookSearchParserJSON
  implements IHTTPResponseParser<IBookItem[]>
{
  constructor() {}

  async parseResponse(response: HTTPClientResponse) {
    const responseJson = await response.json();

    const responseParsed =
      DemoApiBookSearchResponseSchemaJSON.safeParse(responseJson);

    if (!responseParsed.success) {
      throw new Error(
        `DemoApiBookSearchParserJSON.parseResponse(): Invalid response JSON`,
      );
    }

    const items = responseParsed.data as IBookItem[]; //todo: validate responseParsed.data

    if (!items?.length) {
      return [];
    }

    return items;
  }
}
