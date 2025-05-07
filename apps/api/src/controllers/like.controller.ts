// src/controllers/like.controller.ts
import { Request, Response } from "express";
import { toggleRequestBody } from "../types/like.type";
import prisma from "../utils/prisma";
import { error } from "console";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId }: toggleRequestBody = req.body;

    const postExist = await prisma.post.findUnique({ where: { id: postId } });
    if (!postExist) {
      return res.status(400).json({ error: "post doesn't exist" });
    }

    const likeExist = await prisma.like.findUnique({
      where: { userId_postId: { postId: postId, userId: req.user!.id } },
    });
    if (!likeExist) {
      await prisma.like.create({
        data: { postId: postId, userId: req.user!.id },
      });
      return res.status(200).json({ message: "like added" });
    } else {
      await prisma.like.delete({
        where: { userId_postId: { postId: postId, userId: req.user!.id } },
      });
      return res.status(200).json({ message: "like removed" });
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
