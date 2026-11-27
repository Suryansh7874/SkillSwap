
import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { addSkillSchema } from "../validators/skill.validator";
import {
  addSkill,
  getMySkills,
  deleteMySkill,
  discoverSkills,
} from "../controllers/skill.controller";
const router = Router();

router.post(
  "/",
  authenticateUser,
  (req, res, next) => {
    const result = addSkillSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    req.body = result.data;
    next();
  },
  addSkill
);

router.get("/my-skills", authenticateUser, getMySkills);

router.delete("/:userSkillId", authenticateUser, deleteMySkill);

router.get("/discover", authenticateUser, discoverSkills);
export default router;
