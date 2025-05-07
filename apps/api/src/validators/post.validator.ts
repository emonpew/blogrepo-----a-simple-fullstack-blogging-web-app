// src/validators/post.validator.ts
import { body, param } from "express-validator";
import { verifySlug } from "../utils/slugVerifier";

export const postValidator = {
  create: [
    body("title").notEmpty().isString().withMessage("title is required"),
    body("slug").notEmpty().isSlug().withMessage("slug is required"),
    body("content").notEmpty().isString().withMessage("content is required"),
    body("published").default(true).isBoolean(),
    body("tags")
      .optional()
      .isArray()
      .withMessage("tags must be an array")
      .custom((tags) => {
        if (
          !tags.every((tag: any) => typeof tag === "string") ||
          !verifySlug(tags)
        ) {
          throw new Error("All tags must be strings and valid slug");
        }
        return true;
      }),
  ],
  update: [
    param("id").notEmpty().isInt().withMessage("id is required"),
    body("title").optional().isString().withMessage("title should be string"),
    body("slug").optional().isString().withMessage("slug should be string"),
    body("content")
      .optional()
      .isString()
      .withMessage("content should be string"),
    body("published").optional().isBoolean(),
    body("tags")
      .optional()
      .isArray()
      .withMessage("tags must be an array")
      .custom((tags) => {
        if (
          !tags.every((tag: any) => typeof tag === "string") ||
          !verifySlug(tags)
        ) {
          throw new Error("All tags must be strings and valid slug");
        }
        return true;
      }),
  ],
  delete: [param("id").notEmpty().isInt().withMessage("id is required")],
};
