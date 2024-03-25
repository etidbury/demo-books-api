import { z } from "zod";

import { IBookItem, IBookSearchApiClient } from "@acme/books-shared";
import { wait } from "@acme/common";
import {
  fetchWithFormat,
  HTTPResponseFormat,
  IHTTPResponseParser,
} from "@acme/http-api-client";

import { BaseBookSearchApiClient } from "../../base/lib/client";
import { DemoApiBookSearchParserJSON } from "./demo-api-books/json/parser";
import { DemoApiBookSearchParserXML } from "./demo-api-books/xml/parser";

export class BookSearchApiClient_V1
  extends BaseBookSearchApiClient
  implements IBookSearchApiClient
{
  protected async _fetch(url: string, params: URLSearchParams) {
    let parser: IHTTPResponseParser<IBookItem[]>;
    switch (this.format) {
      case HTTPResponseFormat.JSON:
        parser = new DemoApiBookSearchParserJSON();
        break;
      case HTTPResponseFormat.XML:
        parser = new DemoApiBookSearchParserXML();
        break;
      default:
        throw new Error("fetchWithFormat(): Unsupported format specified");
        return;
    }

    return fetchWithFormat(url, params, parser);
  }

  async getBooksByAuthor(args: { author: string; limit: number }) {
    const validatedFields = z
      .object({
        limit: z.number().int().min(1),
        author: z.string().min(1),
      })
      .safeParse(args);

    if (!validatedFields.success) {
      throw new Error(`getBooksByAuthor(): Invalid arguments specified`);
    }

    const response = await this._fetch(
      "http://localhost:3000/api/demo_books_api_v1/books_search",
      new URLSearchParams({
        limit: "" + args.limit,
        q: `${args.author}`,
        format: this.format,
      }),
    );

    if (!response?.length) {
      return [];
    }

    return response;
  }
}
