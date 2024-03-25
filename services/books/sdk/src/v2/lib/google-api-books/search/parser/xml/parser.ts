import * as xmldom from "xmldom-qsa";

import {
  IBookItem,
  TBookPrimaryAuthor,
  TBookPrimaryISBN,
  TBookPrimaryPrice,
} from "@acme/books-shared";
import { random } from "@acme/common";
import { HTTPClientResponse, IHTTPResponseParser } from "@acme/http-api-client";

export class GoogleApiBookParserXML
  implements IHTTPResponseParser<IBookItem[]>
{
  constructor() {}

  async parseResponse(response: HTTPClientResponse) {
    const xmlString = await response.text();

    const xmlDoc = new xmldom.DOMParser().parseFromString(xmlString);

    let results: IBookItem[] = [];

    const entries = xmlDoc.querySelectorAll("entry");
    //todo: demo purposes, improve parsing
    entries.forEach((entry) => {
      const creators = entry.querySelectorAll("dc\\:creator");
      const titles = entry.querySelectorAll("dc\\:title");

      const creator = creators?.length
        ? creators?.[0]?.textContent
        : "[No author]";

      const titleText = titles?.[0]?.textContent?.length
        ? titles?.[0]?.textContent
        : "[No title]";

      results.push({
        author: creator as TBookPrimaryAuthor,
        title: titleText as string,
        isbn: ("RANDOMISBN:" + random(0, 1000)) as TBookPrimaryISBN, //Note: this is a placeholder because the API doesn't provide ISBN for all books
        quantity: Math.floor(Math.random() * 1000), //Note: this is a placeholder because the API doesn't provide quantity
        price: Math.floor(Math.random() * 1000) as TBookPrimaryPrice, //Note: this is a placeholder because the API doesn't provide prices for all books
      });
    });

    return results;
  }
}
