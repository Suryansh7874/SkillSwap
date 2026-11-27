import { Request, Response } from "express";
import { updateProfileService } from "../services/profile.service";
import { updateProfileSchema } from "../validators/profile.validator";
import { getPublicProfileService } from "../services/profile.service";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const validation = updateProfileSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Invalid profile data",
        errors: validation.error.flatten(),
      });
      return;
    }

    const updatedUser = await updateProfileService(
      req.user!.userId,
      validation.data
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const profile = await getPublicProfileService(req.params.userId);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
      return;
    }

    console.error("Get public profile error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};