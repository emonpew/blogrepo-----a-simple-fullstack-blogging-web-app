// src/validators/like.validator.ts
import { body } from "express-validator";

export const likeValidator = {
  toggle: [body("postId").notEmpty().isInt().withMessage("Name is required")],
};
