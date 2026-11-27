
import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";
import { loginUserService } from "../services/auth.service";

import prisma from "../config/database";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (
      error instanceof Error &&
      error.message === "Email is already registered"
    ) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Invalid email or password" ||
        error.message === "Account is not active"
      ) {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }
    }

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: req.user!.userId,
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

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logoutUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: {
        userId: req.user!.userId,
      },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};