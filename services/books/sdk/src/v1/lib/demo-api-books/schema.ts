import { z } from "zod";

const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const schema = z.array(BookSchema);
