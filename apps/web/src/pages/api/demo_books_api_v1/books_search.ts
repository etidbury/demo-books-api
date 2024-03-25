import { NextApiRequest, NextApiResponse } from "next";
import xmlConvert from "xml-js";

import { IBookItem } from "@acme/books-shared";

import { SAMPLE_DATA_BOOKS_20 } from "./sample-data/books_20";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  if (!req.query?.format) {
    res.status(400).json({ error: "Missing format query parameter" });
    return;
  }
  if (!req.query?.q) {
    res.status(400).json({ error: "Missing q search query parameter" });
    return;
  }

  if (!req.query?.limit) {
    res.status(400).json({ error: "Missing limit query parameter" });
    return;
  }

  // deepcode ignore HTTPSourceWithUncheckedType: Demo purpose only
  const format = req.query?.format?.toString() ?? "json";
  const queryValue = req.query?.q?.toString() ?? "";
  // deepcode ignore HTTPSourceWithUncheckedType: Demo purpose only
  const queryLimit = parseInt(req.query?.limit?.toString() ?? "");

  try {
    const responseData = SAMPLE_DATA_BOOKS_20.filter((item) =>
      item.author.toLowerCase().includes(queryValue.toLowerCase()),
    ).slice(0, queryLimit);

    switch (format) {
      case "json":
        res.status(200).json(responseData);
        break;

      case "xml":
        res.setHeader("Content-Type", "application/xml");

        console.log("responseData", responseData);

        const xmlBody = xmlConvert.js2xml(
          { items: responseData.map((item) => ({ item })) },
          {
            compact: true,
            ignoreComment: true,
            spaces: 4,
          },
        );

        console.log("xmlBody", xmlBody);
        res.status(200).send(xmlBody);
        break;

      default:
        res.status(400).json({ error: "Invalid format query parameter" });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
}
