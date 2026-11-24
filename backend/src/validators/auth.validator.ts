
import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),

  college: z
    .string()
    .trim()
    .optional(),

  department: z
    .string()
    .trim()
    .optional(),
});
