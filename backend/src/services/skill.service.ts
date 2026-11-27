
import prisma from "../config/database";
import { Prisma } from "@prisma/client";


interface AddSkillData {
  name: string;
  category?: string;
  skillType: "LEARN" | "TEACH";
  proficiency?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export const addSkillService = async (
  userId: string,
  skillData: AddSkillData
) => {
  const { name, category, skillType, proficiency } = skillData;

  // 1. Find existing skill, ignoring case
  const existingSkill = await prisma.skill.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  // 2. Reuse existing skill or create a new one
  const skill = existingSkill
    ? existingSkill
    : await prisma.skill.create({
        data: {
          name,
          category,
        },
      });

  // 3. Check whether user already has this skill type
  const existingUserSkill = await prisma.userSkill.findUnique({
    where: {
      userId_skillId_skillType: {
        userId,
        skillId: skill.skillId,
        skillType,
      },
    },
  });

  if (existingUserSkill) {
    throw new Error("You have already added this skill");
  }

  // 4. Connect skill to authenticated user
  const userSkill = await prisma.userSkill.create({
    data: {
      userId,
      skillId: skill.skillId,
      skillType,
      proficiency,
    },
    include: {
      skill: true,
    },
  });

  return userSkill;
};



// Get all skills belonging to a user
export const getMySkillsService = async (userId: string) => {
  const skills = await prisma.userSkill.findMany({
    where: {
      userId,
    },
    include: {
      skill: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return skills;
};


// Remove a skill from a user's profile
export const deleteMySkillService = async (
  userId: string,
  userSkillId: string
) => {
  // Check whether this skill belongs to the logged-in user
  const existingUserSkill = await prisma.userSkill.findFirst({
    where: {
      userSkillId,
      userId,
    },
  });

  if (!existingUserSkill) {
    throw new Error("Skill not found in your profile");
  }

  // Delete only the UserSkill relation
  await prisma.userSkill.delete({
    where: {
      userSkillId,
    },
  });

  return true;
};
interface DiscoverSkillsFilters {
  search?: string;
  category?: string;
  skillType?: "LEARN" | "TEACH";
  proficiency?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  page: number;
  limit: number;
}

export const discoverSkillsService = async (
  currentUserId: string,
  filters: DiscoverSkillsFilters
) => {
  const { search, category, skillType, proficiency, page, limit } = filters;

  const where: Prisma.UserSkillWhereInput = {
    // Don't show the current user's own skills
    userId: { not: currentUserId },

    ...(skillType && { skillType }),
    ...(proficiency && { proficiency }),

    // Filter through the related Skill table
    ...((search || category) && {
      skill: {
        is: {
          ...(search && {
            name: { contains: search, mode: "insensitive" },
          }),
          ...(category && {
            category: { contains: category, mode: "insensitive" },
          }),
        },
      },
    }),
  };

  const [skills, total] = await Promise.all([
    prisma.userSkill.findMany({
      where,
      include: {
        skill: true,
        user: {
          select: {
            userId: true,
            name: true,
            college: true,
            department: true,
            bio: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.userSkill.count({ where }),
  ]);

  return {
    skills,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};