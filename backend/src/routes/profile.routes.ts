import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import {
  updateProfile,
  getPublicProfile,
} from "../controllers/profile.controller";

const router = Router();

router.patch("/", authenticateUser, updateProfile);
router.get("/:userId", authenticateUser, getPublicProfile);

export default router;