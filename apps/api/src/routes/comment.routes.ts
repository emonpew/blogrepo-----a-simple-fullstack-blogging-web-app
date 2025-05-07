// src/routes/comment.routes.ts
import { Router } from "express";
import {
  getAllComment,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";
import { commentValidator } from "../validators/comment.validator";
import { handleValidationErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllComment);
router.post(
  "/",
  authenticate,
  commentValidator.create,
  handleValidationErrors,
  createComment
);

router.put(
  "/:id",
  authenticate,
  commentValidator.update,
  handleValidationErrors,
  updateComment
);

router.post(
  "/:id",
  authenticate,
  commentValidator.delete,
  handleValidationErrors,
  deleteComment
);

export default router;
