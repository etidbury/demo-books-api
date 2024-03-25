import * as xmldom from "xmldom-qsa";

import {
  IBookItem,
  TBookPrimaryAuthor,
  TBookPrimaryISBN,
  TBookPrimaryPrice,
} from "@acme/books-shared";
import { HTTPClientResponse, IHTTPResponseParser } from "@acme/http-api-client";

export class DemoApiBookSearchParserXML
  implements IHTTPResponseParser<IBookItem[]>
{
  constructor() {}

  async parseResponse(response: HTTPClientResponse) {
    const xmlString = await response.text();

    const xmlDoc = new xmldom.DOMParser().parseFromString(xmlString);

    let results: IBookItem[] = [];

    const entries = xmlDoc.querySelectorAll("item");

    //todo: demo purposes, improve parsing
    entries.forEach((entry) => {
      const title = entry.querySelector("title")?.textContent ?? "[No title]";
      const author = entry.querySelector("author")
        ?.textContent as TBookPrimaryAuthor;
      const isbn = entry.querySelector("isbn")?.textContent as TBookPrimaryISBN;
      const quantity = parseInt(
        entry.querySelector("price")?.textContent ?? "0",
      ) as number;
      const price = parseInt(
        entry.querySelector("price")?.textContent ?? "0",
      ) as TBookPrimaryPrice;

      results.push({
        author,
        title,
        isbn,
        quantity,
        price,
      });
    });

    return results;
  }
}
