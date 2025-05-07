// src/routes/auth.routes.ts
import { Router, Request, Response } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";
import { authValidator } from "../validators/auth.validator";
import { handleValidationErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  authValidator.create,
  handleValidationErrors,
  registerController
);

router.post(
  "/login",
  authValidator.create,
  handleValidationErrors,
  loginController
);

router.get("/status", authenticate, (req: Request, res: Response) => {
  res.json({
    username: req.user?.username,
  });
});

export default router;
