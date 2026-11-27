
import { Request, Response } from "express";
import {
  addSkillService,
  getMySkillsService,
  deleteMySkillService,
} from "../services/skill.service";
import { discoverSkillsService } from "../services/skill.service";
import { discoverSkillsQuerySchema } from "../validators/skill.validator";


export const addSkill = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const newUserSkill = await addSkillService(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: newUserSkill,
    });

  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "You have already added this skill"
    ) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Add skill error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const getMySkills = async (req: Request, res: Response) => {
  try {
    const skills = await getMySkillsService(req.user!.userId);

    res.status(200).json({
      success: true,
      total: skills.length,
      data: skills,
    });

  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteMySkill = async (req: Request, res: Response) => {
  try {
    await deleteMySkillService(
      req.user!.userId,
      req.params.userSkillId
    );

    res.status(200).json({
      success: true,
      message: "Skill removed successfully",
    });

  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Skill not found in your profile"
    ) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const discoverSkills = async (req: Request, res: Response) => {
  try {
    const validation = discoverSkillsQuerySchema.safeParse(req.query);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Invalid filters",
        errors: validation.error.flatten(),
      });
      return;
    }

    const result = await discoverSkillsService(
      req.user!.userId,
      validation.data
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Discover skills error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};