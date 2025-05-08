// src/controllers/like.controller.ts
import { Request, Response } from "express";
import { toggleRequestBody } from "../types/like.type";
import prisma from "../utils/prisma";
import { error } from "console";
import ResponseService from "../services/response.service";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId }: toggleRequestBody = req.body;

    const postExist = await prisma.post.findUnique({ where: { id: postId } });
    if (!postExist) {
      return ResponseService.notFound(res, "post");
    }

    const likeExist = await prisma.like.findUnique({
      where: { userId_postId: { postId: postId, userId: req.user!.id } },
    });
    if (!likeExist) {
      await prisma.like.create({
        data: { postId: postId, userId: req.user!.id },
      });
      return ResponseService.success(res);
    } else {
      await prisma.like.delete({
        where: { userId_postId: { postId: postId, userId: req.user!.id } },
      });
      return ResponseService.success(res);
    }
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};
