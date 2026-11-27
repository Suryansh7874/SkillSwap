import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(50).optional(),
    college: z.string().trim().max(100).optional(),
    department: z.string().trim().max(100).optional(),
    bio: z.string().trim().max(500).optional(),
    profilePicture: z.string().url().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });