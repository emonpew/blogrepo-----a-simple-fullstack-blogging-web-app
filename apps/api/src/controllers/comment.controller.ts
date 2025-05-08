// src/controllers/comment.controller.ts
import { Request, Response } from "express";
import {
  commentAddRequestBody,
  commentUpdateRequestBody,
} from "../types/comment.type";
import prisma from "../utils/prisma";
import { error } from "console";
import ResponseService from "../services/response.service";

export const getAllComment = async (req: Request, res: Response) => {
  try {
    return res.json({ message: "GET all comment" });
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const reqBody: commentAddRequestBody = req.body;

    const postExist = await prisma.post.findUnique({
      where: { id: reqBody.postId },
    });
    if (!postExist) {
      ResponseService.notFound(res, "post");
    }

    await prisma.comment.create({
      data: { ...reqBody, authorId: req.user!.id },
    });

    return ResponseService.created(res, "comment");
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content }: commentUpdateRequestBody = req.body;
    const id = Number(req.params.id);

    const commentExist = await prisma.comment.findUnique({ where: { id } });
    if (!commentExist) {
      return ResponseService.notFound(res, "comment");
    }
    if (commentExist.authorId !== req.user!.id) {
      return ResponseService.forbidden(
        res,
        "not allowed to change others comment"
      );
    }

    await prisma.comment.update({ data: { content }, where: { id } });
    return ResponseService.success(res);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const commentExist = await prisma.comment.findUnique({ where: { id } });
    if (!commentExist) {
      return ResponseService.notFound(res, "comment");
    }
    if (commentExist.authorId !== req.user!.id) {
      return ResponseService.forbidden(
        res,
        "not allowed to delete others comment"
      );
    }

    await prisma.comment.delete({ where: { id } });

    return ResponseService.success(res);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};
