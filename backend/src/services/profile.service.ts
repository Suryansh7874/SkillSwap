import prisma from "../config/database";

export const updateProfileService = async (
  userId: string,
  profileData: {
    name?: string;
    college?: string;
    department?: string;
    bio?: string;
    profilePicture?: string | null;
  }
) => {
  const updatedUser = await prisma.user.update({
    where: { userId },
    data: profileData,
    select: {
      userId: true,
      name: true,
      email: true,
      college: true,
      department: true,
      bio: true,
      profilePicture: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

export const getPublicProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      name: true,
      college: true,
      department: true,
      bio: true,
      profilePicture: true,
      createdAt: true,

      userSkills: {
        include: {
          skill: {
            select: {
              skillId: true,
              name: true,
              category: true,
              description: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    ...user,
    skillsToTeach: user.userSkills.filter(
      (item) => item.skillType === "TEACH"
    ),
    skillsToLearn: user.userSkills.filter(
      (item) => item.skillType === "LEARN"
    ),
    userSkills: undefined,
  };
};