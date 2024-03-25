export type TBookPrimaryAuthor = string & { _: "TBookPrimaryAuthor" };
export type TBookPrimaryISBN = string & { _: "IBookISBN" };
export type TBookPrimaryPrice = number & { _: "TBookPrimaryPrice" };

export interface IBookItem {
  title: string;
  author: TBookPrimaryAuthor;
  isbn: TBookPrimaryISBN;
  quantity: number;
  price: TBookPrimaryPrice;
}

export interface IBookSearchApiClient {
  getBooksByAuthor: (args: {
    author: string;
    limit: number;
  }) => Promise<IBookItem[]>;
}
