import { expect, test } from "@playwright/test";

const EXAMPLE_QUERY_VALUE = "tim";
const API_ENDPOINT = "/api/demo_books_api_v1";

test("Demo Books Search API endpoint should return XML", async ({ page }) => {
  // endpoint returns xml response

  const r = await page.goto(
    `${API_ENDPOINT}?format=xml&limit=20&q=${EXAMPLE_QUERY_VALUE}`,
    { timeout: 3000 },
  );

  expect(r?.headers()["content-type"]).toContain("xml");

  const xml = await r?.text();

  expect(xml).toContain("<title>");
  expect(xml).toContain("<author>");
  expect(xml).toContain("<isbn>");
  expect(xml).toContain("<quantity>");
  expect(xml).toContain("<price>");
});

test("Demo Books Search API endpoint should return JSON", async ({ page }) => {
  // endpoint returns xml response

  const r = await page.goto(
    `${API_ENDPOINT}?format=json&limit=20&q=${EXAMPLE_QUERY_VALUE}`,
    { timeout: 3000 },
  );

  expect(r?.headers()["content-type"]).toContain("json");

  const json = await r?.json();

  // check json response
  expect(json[0]).toBeDefined();
  expect(json[0]).toHaveProperty("title");
  expect(json[0]).toHaveProperty("author");
  expect(json[0]).toHaveProperty("isbn");
  expect(json[0]).toHaveProperty("quantity");
  expect(json[0]).toHaveProperty("price");
});
