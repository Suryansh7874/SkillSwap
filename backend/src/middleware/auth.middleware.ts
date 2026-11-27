
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";

interface JwtPayload {
  userId: string;
  tokenVersion: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
      select: {
        tokenVersion: true,
        accountStatus: true,
      },
    });

    if (
      !user ||
      user.accountStatus !== "ACTIVE" ||
      user.tokenVersion !== decoded.tokenVersion
    ) {
      res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
      return;
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};
