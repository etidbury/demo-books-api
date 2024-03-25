import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BookSearchApiClientProvider } from "../../lib/context/book-search-api-client";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BookSearchApiClientProvider>{children}</BookSearchApiClientProvider>
    </QueryClientProvider>
  );
}
