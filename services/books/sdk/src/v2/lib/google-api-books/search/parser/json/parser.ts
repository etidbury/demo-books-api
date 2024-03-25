import {
  IBookItem,
  TBookPrimaryAuthor,
  TBookPrimaryISBN,
  TBookPrimaryPrice,
} from "@acme/books-shared";
import { random } from "@acme/common";
import { HTTPClientResponse, IHTTPResponseParser } from "@acme/http-api-client";

import { GoogleApiBookSearchResponseSchemaJSON } from "./schema";

type TGoogleBookItem = Zod.infer<
  typeof GoogleApiBookSearchResponseSchemaJSON
>["items"][0];

export class GoogleApiBookParserJSON
  implements IHTTPResponseParser<IBookItem[]>
{
  constructor() {}

  /**
   * Note: Assumes the primary author is the first author listed in the array
   */
  protected static _parsePrimaryAuthor(
    item: TGoogleBookItem,
  ): TBookPrimaryAuthor {
    const foundAuthor: TBookPrimaryAuthor | undefined = item?.volumeInfo
      ?.authors[0] as unknown as TBookPrimaryAuthor;
    if (!foundAuthor) {
      throw new Error("_parseISBN(): Type ISBN_13 not found");
    }
    return foundAuthor;
  }
  /**
   * Note: Assumes the primary ISBN is the first ISBN of type ISBN_13 listed in the array
   */
  protected static _parsePrimaryISBN(item: TGoogleBookItem): TBookPrimaryISBN {
    const foundISBN: TBookPrimaryISBN | undefined =
      item?.volumeInfo?.industryIdentifiers.find(
        ({ type }) => type === "ISBN_13",
      )?.identifier as unknown as TBookPrimaryISBN;

    if (!foundISBN) {
      throw new Error("_parsePrimaryISBN(): Type ISBN_13 not found");
    }
    return foundISBN;
  }

  protected static _parseBookItem(
    item: Zod.infer<typeof GoogleApiBookSearchResponseSchemaJSON>["items"][0],
  ): IBookItem {
    return {
      title: item.volumeInfo.title,
      author: GoogleApiBookParserJSON._parsePrimaryAuthor(item),
      isbn: GoogleApiBookParserJSON._parsePrimaryISBN(item),
      quantity: Math.floor(Math.random() * 1000), //Note: this is a placeholder because the API doesn't provide quantity
      price: Math.floor(Math.random() * 1000) as TBookPrimaryPrice, //Note: this is a placeholder because the API doesn't provide prices for all books
    };
  }

  async parseResponse(response: HTTPClientResponse) {
    const responseJson = await response.json();

    const responseParsed =
      GoogleApiBookSearchResponseSchemaJSON.safeParse(responseJson);

    if (!responseParsed.success) {
      throw new Error(
        `GoogleApiBookParserJSON.parseResponse(): Invalid response JSON`,
      );
    }

    const items = responseParsed.data.items;

    if (!items?.length) {
      return [];
    }

    return items.map(GoogleApiBookParserJSON._parseBookItem);
  }
}
