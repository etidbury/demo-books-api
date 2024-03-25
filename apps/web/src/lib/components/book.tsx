import { IBookItem } from "@acme/books-shared";

export default function Book(props: { book: IBookItem }) {
  return (
    <li>
      {props.book.title} by {props.book.author} (ISBN: {props.book.isbn})
    </li>
  );
}
