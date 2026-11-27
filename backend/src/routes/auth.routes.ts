
import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { registerSchema } from "../validators/auth.validator";
import { loginUser } from "../controllers/auth.controller";
import { loginSchema } from "../validators/auth.validator";
import { authenticateUser } from "../middleware/auth.middleware";
import { getCurrentUser } from "../controllers/auth.controller";

import { logoutUser } from "../controllers/auth.controller";


const router = Router();

router.post("/register", (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  req.body = result.data;
  next();
}, registerUser);

export default router;

router.post("/login", (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

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
}, loginUser);

router.get("/me", authenticateUser, getCurrentUser);


router.post("/logout", authenticateUser, logoutUser);
