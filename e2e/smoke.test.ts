import { URLSearchParams } from "url";
import { expect, test } from "@playwright/test";

const EXAMPLE_QUERY_VALUE = "tim";
test("Check homepage up", async ({ page }) => {
  const r = await page.goto("/");
  expect(r?.status()).toBe(200);
  await page.waitForSelector("h2");
  const title = await page.textContent("h2");
  expect(title).toBe("Books Search");
});

test("Results page should not have any failed API requests", async ({
  page,
}) => {
  const failedRequests: string[] = [];

  page.on("requestfailed", (request) => {
    failedRequests.push(request.url());
  });

  const _url = new URL(`/results`, process.env.NEXT_PUBLIC_SITE_URL);

  _url.search = new URLSearchParams({
    q: EXAMPLE_QUERY_VALUE,
  }).toString();
  console.log("URL: ", _url.toString());

  const r = await page.goto(_url.toString(), {
    timeout: 3000,
    waitUntil: "networkidle",
  });

  expect(r?.status()).toBe(200);

  expect(
    failedRequests,
    "Failed requests: " + failedRequests.join(", "),
  ).toHaveLength(0);
});

test("Results page with different feature flags enabled should not have any failed API requests", async ({
  page,
}) => {
  const failedRequests: string[] = [];

  page.on("requestfailed", (request) => {
    failedRequests.push(request.url());
  });

  const _url = new URL(`/results`, process.env.NEXT_PUBLIC_SITE_URL);

  const FF_MATRIX: {
    ff_enable_xml_format: boolean;
    ff_enable_sdk_v2: boolean;
  }[] = [
    {
      ff_enable_xml_format: true,
      ff_enable_sdk_v2: true,
    },
    {
      ff_enable_xml_format: false,
      ff_enable_sdk_v2: true,
    },
    {
      ff_enable_xml_format: true,
      ff_enable_sdk_v2: false,
    },
    {
      ff_enable_xml_format: false,
      ff_enable_sdk_v2: false,
    },
  ];

  for (const ff of FF_MATRIX) {
    const query: Record<string, string> = {
      q: EXAMPLE_QUERY_VALUE,
    };

    if (ff.ff_enable_xml_format) {
      query["ff_enable_xml_format"] = "1";
    }

    if (ff.ff_enable_sdk_v2) {
      query["ff_enable_sdk_v2"] = "1";
    }

    _url.search = new URLSearchParams(query).toString();
    console.log("URL: ", _url.toString());

    const r = await page.goto(_url.toString(), {
      timeout: 3000,
      waitUntil: "networkidle",
    });

    expect(r?.status()).toBe(200);

    expect(
      failedRequests,
      "Failed requests: " + failedRequests.join(", " + JSON.stringify(ff)),
    ).toHaveLength(0);
  }
});
