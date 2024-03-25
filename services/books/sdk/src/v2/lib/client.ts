import { z } from "zod";

import type { IBookItem, IBookSearchApiClient } from "@acme/books-shared";
import { urljoin } from "@acme/common";
import type { IHTTPResponseParser } from "@acme/http-api-client";
import { fetchWithFormat, HTTPResponseFormat } from "@acme/http-api-client";

import { BaseBookSearchApiClient } from "../../base/lib/client";
import {
  GoogleApiBookParserJSON,
  GoogleApiBookParserXML,
} from "./google-api-books";

export class BookSearchApiClient_V2
  extends BaseBookSearchApiClient
  implements IBookSearchApiClient
{
  protected async _fetch(url: string, params: URLSearchParams) {
    let parser: IHTTPResponseParser<IBookItem[]>;
    switch (this.format) {
      case HTTPResponseFormat.JSON:
        parser = new GoogleApiBookParserJSON();
        break;
      case HTTPResponseFormat.XML:
        parser = new GoogleApiBookParserXML();
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

    const response = await (this.format === HTTPResponseFormat.XML
      ? this._fetch(
          //"https://books.google.com/books/feeds/volumes",
          urljoin(
            process.env.NEXT_PUBLIC_SITE_URL,
            `/api/proxy_googleapi/books_search`,
          ),
          new URLSearchParams({
            maxResults: "" + args.limit,
            q: `inauthor:${args.author}`,
          }),
        )
      : this._fetch(
          `https://www.googleapis.com/books/v1/volumes`,
          new URLSearchParams({
            limit: "" + args.limit,
            q: `inauthor:${args.author}`,
          }),
        ));

    if (!response?.length) {
      return [];
    }

    return response.slice(0, args.limit); //client-side limit items too
  }
}
