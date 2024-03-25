import { HTTPResponseFormat } from "@acme/http-api-client";

import { BookSearchApiClient_V1 } from "./client";

describe("BookSearchApiClient_V1", () => {
  let client: BookSearchApiClient_V1;

  beforeEach(() => {
    client = new BookSearchApiClient_V1(HTTPResponseFormat.JSON);
  });

  it("successfully queries books by author", async () => {
    const books1 = await client.getBooksByAuthor({
      author: "Author",
      limit: 10,
    });

    expect(books1).toBeDefined();
    expect(books1?.length).toStrictEqual(10);

    const books2 = await client.getBooksByAuthor({
      author: "Author 3",
      limit: 10,
    });

    expect(books2).toBeDefined();
    expect(books2?.length).toStrictEqual(1);
  });

  it("successfully limits results of books", async () => {
    const books1 = await client.getBooksByAuthor({
      author: "Author",
      limit: 3,
    });

    expect(books1).toBeDefined();
    expect(books1?.length).toStrictEqual(3);
  });

  it("throws an error for invalid arguments", async () => {
    await expect(
      client.getBooksByAuthor({ author: "", limit: 10 }),
    ).rejects.toThrow("getBooksByAuthor(): Invalid arguments specified");
    await expect(
      client.getBooksByAuthor({ author: "", limit: 0 }),
    ).rejects.toThrow("getBooksByAuthor(): Invalid arguments specified");
  });
});
