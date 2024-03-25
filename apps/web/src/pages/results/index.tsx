import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useSDKQuery } from "@acme/helper-sdk-client";

import Book from "~/lib/components/book";
import { useBookSearchApiClient } from "../../lib/context/book-search-api-client";
import ClientProviders from "./client-providers";

function ResultsPage() {
  const client = useBookSearchApiClient();

  const searchParams = useSearchParams();

  const searchQueryValue = searchParams.get("q") ?? "";

  const { data, error } = useSDKQuery(
    client,
    "getBooksByAuthor",
    [
      {
        author: searchQueryValue,
        limit: 10,
      },
    ],
    { enabled: searchQueryValue.length > 0, refetchInterval: 10 * 1000 },
  );

  return (
    <section>
      <h2>Book Results</h2>
      <nav>
        <Link href="/">Back to search</Link>
      </nav>
      <div>
        {error || !data ? (
          <p>Error: finding results</p>
        ) : (
          <ul>
            {data && data?.map((book, idx) => <Book key={idx} book={book} />)}
          </ul>
        )}

        <h3>Raw data</h3>
        <pre>{JSON.stringify(error ? [] : data, null, 2)}</pre>
      </div>
    </section>
  );
}

export default function Layout() {
  return (
    <ClientProviders>
      <ResultsPage />
    </ClientProviders>
  );
}
