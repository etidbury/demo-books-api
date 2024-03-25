import { expect, test } from "@playwright/test";

const EXAMPLE_QUERY_VALUE = "tim";
const API_ENDPOINT = "/api/proxy_googleapi/books_search";

test("Demo Proxy Google Books Search API endpoint should return XML", async ({
  page,
}) => {
  const r = await page.goto(
    `${API_ENDPOINT}?format=xml&limit=20&q=${EXAMPLE_QUERY_VALUE}`,
    { timeout: 3000 },
  );

  expect(r?.headers()["content-type"]).toContain("xml");

  const xml = await r?.text();

  expect(xml).toContain("<dc:title>");
  expect(xml).toContain("<author>");
  expect(xml).toContain("<dc:identifier>"); //isbn
  // expect(xml).toContain("<quantity>"); //not returned by Google Books API
  // expect(xml).toContain("<price>"); //not returned by Google Books API
});
