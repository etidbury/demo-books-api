import { HTTPResponseFormat } from "@acme/http-api-client";

import { BookSearchApiClient_V2 } from "./client";

describe("BookSearchApiClient_V2", () => {
  it("successfully fetches books by author using [JSON format]", async () => {
    const client = new BookSearchApiClient_V2(HTTPResponseFormat.JSON);
    const books = await client.getBooksByAuthor({
      author: "J.K. Rowling",
      limit: 10,
    });

    expect(books).toBeDefined();
    expect(books.length).toBeGreaterThan(0);
  });

  it("successfully limits results of books using [JSON format]", async () => {
    const client = new BookSearchApiClient_V2(HTTPResponseFormat.JSON);
    const books1 = await client.getBooksByAuthor({
      author: "tim",
      limit: 3,
    });

    expect(books1).toBeDefined();
    expect(books1.length).toStrictEqual(3);
  });

  it("successfully fetches books by author using [XML format]", async () => {
    const client = new BookSearchApiClient_V2(HTTPResponseFormat.XML);
    const books = await client.getBooksByAuthor({
      author: "J.K. Rowling",
      limit: 10,
    });
    expect(books).toBeDefined();
    expect(books.length).toBeGreaterThan(0);
  });

  it("successfully limits results of books using [XML format]t", async () => {
    const client = new BookSearchApiClient_V2(HTTPResponseFormat.XML);
    const books1 = await client.getBooksByAuthor({
      author: "J.K. Rowling",
      limit: 3,
    });

    expect(books1).toBeDefined();
    expect(books1.length).toStrictEqual(3);
  });

  it("throws an error for invalid arguments", async () => {
    const client = new BookSearchApiClient_V2(HTTPResponseFormat.JSON);

    await expect(
      client.getBooksByAuthor({ author: "", limit: 10 }),
    ).rejects.toThrow("getBooksByAuthor(): Invalid arguments specified");
    await expect(
      client.getBooksByAuthor({ author: "", limit: 0 }),
    ).rejects.toThrow("getBooksByAuthor(): Invalid arguments specified");
  });
});
