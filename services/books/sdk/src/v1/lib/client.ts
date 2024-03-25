import { z } from "zod";

import type { IBookItem, IBookSearchApiClient } from "@acme/books-shared";
import { urljoin } from "@acme/common";
import type { IHTTPResponseParser } from "@acme/http-api-client";
import { fetchWithFormat, HTTPResponseFormat } from "@acme/http-api-client";

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
      urljoin(
        process.env.NEXT_PUBLIC_SITE_URL,
        `/api/demo_books_api_v1/books_search`,
      ),
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
