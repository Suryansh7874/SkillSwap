
import { z } from "zod";

export const addSkillSchema = z.object({
  name: z.string().trim().min(2).max(50),

  category: z.string().trim().optional(),

  skillType: z.enum(["LEARN", "TEACH"]),

  proficiency: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .optional(),
});
export const discoverSkillsQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),

  skillType: z.enum(["LEARN", "TEACH"]).optional(),

  proficiency: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .optional(),

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});