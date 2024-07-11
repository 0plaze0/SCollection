import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.string(),
  quantity: z.string(),
  shipping: z.string(),
});
