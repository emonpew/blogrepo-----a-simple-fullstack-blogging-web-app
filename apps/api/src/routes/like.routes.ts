// src/routes/like.routes.ts
import { Router } from "express";
import { toggleLike } from "../controllers/like.controller";
import { likeValidator } from "../validators/like.validator";
import { handleValidationErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  likeValidator.toggle,
  handleValidationErrors,
  toggleLike
);

export default router;
