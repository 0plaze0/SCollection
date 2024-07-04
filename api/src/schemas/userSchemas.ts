import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(5, { message: "User name length should be greater then 4" }),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  answer: z.string(),
});
export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
