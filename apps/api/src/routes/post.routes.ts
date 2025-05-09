// src/routes/post.routes.ts
import { Router } from "express";
import {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "../controllers/post.controller";
import { postValidator } from "../validators/post.validator";
import { handleValidationErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllPost);
router.get("/:id", getPost);
router.post(
  "/",
  authenticate,
  postValidator.create,
  handleValidationErrors,
  createPost
);
router.put(
  "/:id",
  authenticate,
  postValidator.update,
  handleValidationErrors,
  updatePost
);
router.delete(
  "/:id",
  authenticate,
  postValidator.update,
  handleValidationErrors,
  deletePost
);

export default router;
