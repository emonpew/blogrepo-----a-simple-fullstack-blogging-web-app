// src/validators/comment.validator.ts
import { body, param } from "express-validator";

export const commentValidator = {
  create: [
    body("postId").notEmpty().isInt().withMessage("id is required"),
    body("content")
      .notEmpty()
      .isString()
      .withMessage("comment should be string"),
  ],
  update: [
    param("id").notEmpty().isInt().withMessage("id is required"),
    body("content")
      .notEmpty()
      .isString()
      .withMessage("comment should be string"),
  ],
  delete: [param("id").notEmpty().isInt().withMessage("id is required")],
};
