
import bcrypt from "bcryptjs";
import prisma from "../config/database";
import jwt from "jsonwebtoken";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  college?: string;
  department?: string;
}

export const registerUserService = async (
  userData: RegisterUserData
) => {
  const { name, email, password, college, department } = userData;

  // Step 1: Check whether the email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Step 2: Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Step 3: Create the user in PostgreSQL
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      college,
      department,
    },
    select: {
      userId: true,
      name: true,
      email: true,
      college: true,
      department: true,
      bio: true,
      profilePicture: true,
      createdAt: true,
      accountStatus: true,
    },
  });

  // Step 4: Return the newly created user
  return newUser;
};



// Login service
export const loginUserService = async (email: string, password: string) => {
  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Check account status
  if (user.accountStatus !== "ACTIVE") {
    throw new Error("Account is not active");
  }

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 4. Generate JWT
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(
    {
    userId: user.userId,
    tokenVersion: user.tokenVersion,
  },
    secret,
    { expiresIn: "1d" }
  );

  // 5. Return safe user data and token
  const { passwordHash, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};
