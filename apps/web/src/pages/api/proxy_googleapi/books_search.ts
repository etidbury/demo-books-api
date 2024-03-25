import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const externalApiUrl = "https://books.google.com/books/feeds/volumes";

    const _url = new URL(externalApiUrl);

    _url.search = new URLSearchParams(
      req.query as Record<string, string>,
    ).toString();

    // deepcode ignore Ssrf: Demo purpose only
    const response = await fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch XML: ${response.statusText}`);
    }

    const xmlBody = await response.text();

    res.setHeader("Content-Type", "application/xml");

    res.status(200).send(xmlBody);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
}
