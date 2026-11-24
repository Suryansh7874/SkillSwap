
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    res.status(200).json({
      success: true,
      message: "Registration request received",
      data: userData,
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
